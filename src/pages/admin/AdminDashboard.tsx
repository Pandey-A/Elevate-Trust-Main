import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  LayoutDashboard,
  LogOut,
  Pencil,
  Play,
  Plus,
  Tags,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { type AdminDemo, type AdminJob, type IndustryTag } from "../../data/adminDefaults";
import { useAdminAuth, useAdminBlogs, useAdminDemos, useAdminJobs, useAdminDemoTags, useDemoTags } from "../../hooks/useAdminData";
import {
  createId,
  deleteJob,
  extractYoutubeId,
  upsertJob,
  youtubeThumb,
} from "../../lib/adminStorage";
import { getErrorMessage } from "../../lib/api";
import { logoutUser } from "../../lib/auth";
import {
  createDemo,
  deleteDemo,
  toggleDemoVisibility,
  updateDemo,
} from "../../lib/demosApi";
import {
  createBlog,
  deleteBlog,
  updateBlog,
  type BlogPost,
} from "../../lib/blogsApi";
import {
  deleteCareerApplication,
  fetchCareerApplications,
  type CareerApplication,
} from "../../lib/careersApi";
import { createDemoTag, deleteDemoTag, updateDemoTag, type DemoTag } from "../../lib/tagsApi";
import BlogRichTextEditor from "../../components/blog/BlogRichTextEditor";
import { excerptFromContent, isRichTextEmpty } from "../../lib/blogContent";
import brainstormingIcon from "../../assets/OurServices/brainstorming.png";
import analysisIcon from "../../assets/OurServices/analysis.png";

type Tab = "overview" | "demos" | "blogs" | "tags" | "jobs" | "applications";

const emptyDemoForm = {
  id: "",
  title: "",
  youtubeUrl: "",
  industries: ["Healthcare and Life Sciences"] as IndustryTag[],
  isPublic: true,
};

const emptyBlogForm = {
  id: "",
  title: "",
  description: "",
};

function youtubeEmbed(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

const emptyJobForm = {
  id: "",
  title: "",
  tag: "",
  description: "",
  type: "Full-time",
  location: "Remotely",
  category: "Software Development",
  categorySubtitle: "Open position in our software team.",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const session = useAdminAuth();
  const { demos, loading: demosLoading, error: demosLoadError, refresh: refreshDemos } = useAdminDemos();
  const { blogs, loading: blogsLoading, error: blogsLoadError, refresh: refreshBlogs } = useAdminBlogs();
  const { tags: demoTags, loading: tagsLoading, error: tagsLoadError, refresh: refreshTags } = useDemoTags();
  const { tags: adminDemoTags, loading: adminTagsLoading, error: adminTagsLoadError, refresh: refreshAdminTags } = useAdminDemoTags();
  const jobs = useAdminJobs();

  const [tab, setTab] = useState<Tab>("overview");
  const [demoForm, setDemoForm] = useState(emptyDemoForm);
  const [demoThumbnailFile, setDemoThumbnailFile] = useState<File | null>(null);
  const [demoThumbnailPreview, setDemoThumbnailPreview] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState(emptyJobForm);
  const [demoError, setDemoError] = useState("");
  const [blogError, setBlogError] = useState("");
  const [jobError, setJobError] = useState("");
  const [demoSuccess, setDemoSuccess] = useState("");
  const [blogSuccess, setBlogSuccess] = useState("");
  const [jobSuccess, setJobSuccess] = useState("");
  const [demoSaving, setDemoSaving] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [tagName, setTagName] = useState("");
  const [editingTagId, setEditingTagId] = useState("");
  const [tagError, setTagError] = useState("");
  const [tagSuccess, setTagSuccess] = useState("");
  const [tagSaving, setTagSaving] = useState(false);
  const [playingDemo, setPlayingDemo] = useState<AdminDemo | null>(null);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");
  const [deletingApplicationId, setDeletingApplicationId] = useState<number | null>(
    null,
  );

  const loadApplications = useCallback(async () => {
    try {
      setApplicationsLoading(true);
      setApplicationsError("");
      const data = await fetchCareerApplications();
      setApplications(data);
    } catch (err) {
      setApplicationsError(
        getErrorMessage(err, "Unable to load applications."),
      );
    } finally {
      setApplicationsLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!session) return;
    void loadApplications();
  }, [session, loadApplications]);

  useEffect(() => {
    if (!playingDemo) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlayingDemo(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [playingDemo]);

  const resetBlogForm = () => {
    setBlogForm(emptyBlogForm);
    setBlogImageFile(null);
    setBlogImagePreview(null);
    setBlogError("");
    setBlogSuccess("");
  };

  const onEditBlog = (blog: BlogPost) => {
    setTab("blogs");
    setBlogForm({
      id: blog.id,
      title: blog.title,
      description: blog.description,
    });
    setBlogImageFile(null);
    setBlogImagePreview(blog.imageUrl || null);
    setBlogSuccess("");
    setBlogError("");
  };

  const editingDemo = Boolean(demoForm.id);
  const editingBlog = Boolean(blogForm.id);
  const editingJob = Boolean(jobForm.id);

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    demos.forEach((demo) => {
      demo.industries.forEach((industry) => {
        counts[industry] = (counts[industry] ?? 0) + 1;
      });
    });
    return counts;
  }, [demos]);

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onDeleteApplication = async (application: CareerApplication) => {
    if (
      !window.confirm(
        `Remove application from ${application.fullName}? This cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      setDeletingApplicationId(application.id);
      setApplicationsError("");
      await deleteCareerApplication(application.id);
      setApplications((prev) => prev.filter((item) => item.id !== application.id));
    } catch (err) {
      setApplicationsError(
        getErrorMessage(err, "Unable to delete application."),
      );
    } finally {
      setDeletingApplicationId(null);
    }
  };

  if (!session) {
    return <Navigate to="/admin" replace />;
  }

  const resetDemoForm = () => {
    setDemoForm(emptyDemoForm);
    setDemoThumbnailFile(null);
    setDemoThumbnailPreview(null);
    setDemoError("");
    setDemoSuccess("");
  };

  const resetJobForm = () => {
    setJobForm(emptyJobForm);
    setJobError("");
    setJobSuccess("");
  };

  const onEditDemo = (demo: AdminDemo) => {
    setTab("demos");
    setDemoForm({
      id: demo.id,
      title: demo.title,
      youtubeUrl: demo.youtubeUrl,
      industries: demo.industries,
      isPublic: demo.isPublic,
    });
    setDemoThumbnailFile(null);
    setDemoThumbnailPreview(demo.thumbnailUrl ?? null);
    setDemoSuccess("");
    setDemoError("");
  };

  const onEditJob = (job: AdminJob) => {
    setTab("jobs");
    setJobForm({
      id: job.id,
      title: job.title,
      tag: job.tag,
      description: job.description,
      type: job.type,
      location: job.location,
      category: job.category,
      categorySubtitle: job.categorySubtitle,
    });
    setJobSuccess("");
    setJobError("");
  };

  const toggleIndustry = (industry: IndustryTag) => {
    setDemoForm((prev) => {
      const exists = prev.industries.includes(industry);
      const industries = exists
        ? prev.industries.filter((item) => item !== industry)
        : [...prev.industries, industry];
      return { ...prev, industries };
    });
  };

  const submitDemo = async (event: FormEvent) => {
    event.preventDefault();
    setDemoError("");
    setDemoSuccess("");

    const videoId = extractYoutubeId(demoForm.youtubeUrl);
    if (!demoForm.title.trim()) {
      setDemoError("Demo title is required.");
      return;
    }
    if (!videoId) {
      setDemoError("Enter a valid YouTube URL or video ID.");
      return;
    }
    if (demoForm.industries.length === 0) {
      setDemoError("Select at least one industry tag.");
      return;
    }

    const payload = {
      title: demoForm.title.trim(),
      youtubeUrl: demoForm.youtubeUrl.trim(),
      industries: demoForm.industries,
      isPublic: demoForm.isPublic,
      thumbnailFile: demoThumbnailFile,
    };

    try {
      setDemoSaving(true);
      if (editingDemo) {
        await updateDemo(demoForm.id, payload);
        setDemoForm(emptyDemoForm);
        setDemoThumbnailFile(null);
        setDemoThumbnailPreview(null);
        setDemoSuccess("Demo updated successfully.");
      } else {
        await createDemo({ id: createId("demo"), ...payload });
        setDemoForm(emptyDemoForm);
        setDemoThumbnailFile(null);
        setDemoThumbnailPreview(null);
        setDemoSuccess("Demo added successfully.");
      }
      setDemoError("");
    } catch (err) {
      setDemoError(getErrorMessage(err, "Unable to save demo."));
    } finally {
      setDemoSaving(false);
    }
  };

  const submitBlog = async (event: FormEvent) => {
    event.preventDefault();
    setBlogError("");
    setBlogSuccess("");

    if (!blogForm.title.trim()) {
      setBlogError("Blog title is required.");
      return;
    }
    if (isRichTextEmpty(blogForm.description)) {
      setBlogError("Blog content is required.");
      return;
    }
    if (!editingBlog && !blogImageFile) {
      setBlogError("Blog cover image is required.");
      return;
    }

    const payload = {
      title: blogForm.title.trim(),
      description: blogForm.description.trim(),
      imageFile: blogImageFile,
    };

    try {
      setBlogSaving(true);
      if (editingBlog) {
        await updateBlog(blogForm.id, payload);
        resetBlogForm();
        setBlogSuccess("Blog updated successfully.");
      } else {
        await createBlog({
          id: createId("blog"),
          ...payload,
          imageFile: blogImageFile!,
        });
        resetBlogForm();
        setBlogSuccess("Blog published successfully.");
      }
      setBlogError("");
      void refreshBlogs();
    } catch (err) {
      setBlogError(getErrorMessage(err, "Unable to save blog."));
    } finally {
      setBlogSaving(false);
    }
  };

  const editingTag = Boolean(editingTagId);

  const resetTagForm = () => {
    setTagName("");
    setEditingTagId("");
    setTagError("");
    setTagSuccess("");
  };

  const onEditTag = (tag: DemoTag) => {
    setTab("tags");
    setEditingTagId(tag.id);
    setTagName(tag.name);
    setTagError("");
    setTagSuccess("");
  };

  const submitTag = async (event: FormEvent) => {
    event.preventDefault();
    setTagError("");
    setTagSuccess("");

    const name = tagName.trim();
    if (!name) {
      setTagError("Tag name is required.");
      return;
    }
    if (name.length < 2) {
      setTagError("Tag name must be at least 2 characters.");
      return;
    }

    try {
      setTagSaving(true);
      if (editingTag) {
        await updateDemoTag(editingTagId, name);
        resetTagForm();
        setTagSuccess(`Tag "${name}" updated successfully.`);
      } else {
        await createDemoTag(name);
        resetTagForm();
        setTagSuccess(`Tag "${name}" added successfully.`);
      }
      void refreshTags();
      void refreshAdminTags();
    } catch (err) {
      setTagError(getErrorMessage(err, editingTag ? "Unable to update tag." : "Unable to add tag."));
    } finally {
      setTagSaving(false);
    }
  };

  const submitJob = (event: FormEvent) => {
    event.preventDefault();
    setJobError("");
    setJobSuccess("");

    if (!jobForm.title.trim() || !jobForm.description.trim() || !jobForm.category.trim()) {
      setJobError("Title, description, and category are required.");
      return;
    }

    upsertJob({
      id: jobForm.id || createId("job"),
      title: jobForm.title.trim(),
      tag: jobForm.tag.trim() || jobForm.category.trim(),
      description: jobForm.description.trim(),
      type: jobForm.type.trim() || "Full-time",
      location: jobForm.location.trim() || "Remotely",
      category: jobForm.category.trim(),
      categorySubtitle:
        jobForm.categorySubtitle.trim() ||
        `Open position in our ${jobForm.category.trim().toLowerCase()} team.`,
    });

    setJobSuccess(editingJob ? "Job updated successfully." : "Job posting added successfully.");
    resetJobForm();
  };

  const onLogout = () => {
    logoutUser();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <header className="sticky top-0 z-30 border-b border-[#d7e6f3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1692px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10 xl:px-12 2xl:py-5">
          <div className="min-w-0">
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-[#2365aa] 2xl:text-sm">
              ElevateTrust Admin
            </p>
            <h1 className="m-0 mt-1 truncate text-xl font-bold text-[#1F2432] sm:text-2xl 2xl:text-[28px]">
              Welcome, {session.name}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <Link
              to="/resources/demo"
              className="rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3.5 py-2 text-xs font-semibold text-[#2365aa] no-underline sm:px-4 sm:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base"
            >
              View Demo page
            </Link>
            <Link
              to="/careers"
              className="rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3.5 py-2 text-xs font-semibold text-[#2365aa] no-underline sm:px-4 sm:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base"
            >
              View Careers
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#113d77] px-3.5 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1692px] gap-5 px-5 py-5 sm:gap-6 sm:px-8 sm:py-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-10 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-8 xl:px-12 2xl:grid-cols-[280px_minmax(0,1fr)] 2xl:gap-10 2xl:py-8">
        <aside className="h-fit rounded-[20px] border border-[#d7e6f3] bg-white p-2 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.35)] sm:p-3 xl:rounded-[24px] 2xl:p-4">
          <div className="flex gap-2 overflow-x-auto lg:block lg:overflow-visible">
            {(
              [
                ["overview", "Overview", LayoutDashboard],
                ["demos", "Manage Demos", Video],
                ["blogs", "Manage Blogs", BookOpen],
                ["tags", "Manage Tags", Tags],
                ["jobs", "Manage Jobs", Briefcase],
                ["applications", "Manage Applications", FileText],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`mb-0 flex shrink-0 cursor-pointer items-center gap-2.5 rounded-[14px] border-0 px-3.5 py-2.5 text-left text-sm font-semibold transition lg:mb-1.5 lg:w-full lg:gap-3 lg:px-3.5 lg:py-3 2xl:rounded-[16px] 2xl:px-4 2xl:py-3.5 2xl:text-base ${
                  tab === id
                    ? "bg-[#113d77] text-white"
                    : "bg-[#EFF7FC] text-[#5a5a5a] hover:bg-[#e5eef7] lg:bg-transparent lg:hover:bg-[#EFF7FC]"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0">
          {tab === "overview" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 2xl:gap-6">
                {[
                  { label: "Total demos", value: demos.length, icon: brainstormingIcon },
                  { label: "Total blogs", value: blogs.length, icon: analysisIcon },
                  { label: "Demo tags", value: demoTags.length, icon: brainstormingIcon },
                  { label: "Open jobs", value: jobs.length, icon: analysisIcon },
                  {
                    label: "Applications",
                    value: applications.length,
                    icon: brainstormingIcon,
                  },
                  {
                    label: "Industry tags used",
                    value: Object.keys(industryCounts).length,
                    icon: analysisIcon,
                  },
                ].map((card) => (
                  <article
                    key={card.label}
                    className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] xl:rounded-[24px] xl:p-6 2xl:p-7"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF7FC] p-2 2xl:h-14 2xl:w-14">
                      <img src={card.icon} alt="" aria-hidden className="h-7 w-7 object-contain 2xl:h-8 2xl:w-8" />
                    </div>
                    <p className="m-0 text-sm text-[#848b9b] 2xl:text-base">{card.label}</p>
                    <p className="mt-1 text-3xl font-bold text-[#113d77] 2xl:text-4xl">{card.value}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 sm:p-6 xl:rounded-[24px] 2xl:p-8">
                <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">Quick actions</h2>
                <div className="mt-4 flex flex-wrap gap-3 2xl:mt-5">
                  <button
                    type="button"
                    onClick={() => setTab("demos")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-4 py-2.5 text-sm font-semibold text-white 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <Plus size={16} />
                    Add demo
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("blogs")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2.5 text-sm font-semibold text-[#2365aa] 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <Plus size={16} />
                    Add blog
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("jobs")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2.5 text-sm font-semibold text-[#2365aa] 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <Plus size={16} />
                    Add job posting
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("applications")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2.5 text-sm font-semibold text-[#2365aa] 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <FileText size={16} />
                    View applications
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          {tab === "demos" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <form
                onSubmit={submitDemo}
                className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 2xl:mb-5">
                  <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                    {editingDemo ? "Update demo" : "Add YouTube demo"}
                  </h2>
                  {editingDemo ? (
                    <button
                      type="button"
                      onClick={resetDemoForm}
                      className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa]"
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Demo title
                    <input
                      value={demoForm.title}
                      onChange={(event) =>
                        setDemoForm((prev) => ({ ...prev, title: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="e.g. Crowd Detection"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    YouTube URL
                    <input
                      value={demoForm.youtubeUrl}
                      onChange={(event) =>
                        setDemoForm((prev) => ({ ...prev, youtubeUrl: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </label>
                </div>

                {/* Thumbnail image upload */}
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-[#5a5a5a]">
                    Thumbnail image <span className="font-normal text-[#848b9b]">(optional — replaces auto-generated YouTube thumbnail)</span>
                  </p>
                  <div className="flex flex-wrap items-start gap-4">
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      {demoThumbnailFile ? demoThumbnailFile.name : "Choose image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          setDemoThumbnailFile(file);
                          setDemoThumbnailPreview(file ? URL.createObjectURL(file) : null);
                        }}
                      />
                    </label>
                    {demoThumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={demoThumbnailPreview}
                          alt="Thumbnail preview"
                          className="h-20 w-32 rounded-[10px] border border-[#d7e6f3] object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => { setDemoThumbnailFile(null); setDemoThumbnailPreview(null); }}
                          className="absolute -right-2 -top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-0 bg-[#2365aa] text-[10px] font-bold text-white"
                          aria-label="Remove thumbnail"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="m-0 text-sm font-medium text-[#5a5a5a]">Industry tags</p>
                    <button
                      type="button"
                      onClick={() => setTab("tags")}
                      className="cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-[#2365aa] hover:underline"
                    >
                      Manage tags
                    </button>
                  </div>
                  {tagsLoading ? (
                    <p className="mb-2 text-xs text-[#848b9b]">Loading tags...</p>
                  ) : null}
                  {tagsLoadError ? (
                    <p className="mb-2 text-xs text-[#2365aa]">{tagsLoadError}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {demoTags.map((industry) => {
                      const active = demoForm.industries.includes(industry);
                      return (
                        <button
                          key={industry}
                          type="button"
                          onClick={() => toggleIndustry(industry)}
                          className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            active
                              ? "border-[#113d77] bg-[#113d77] text-white"
                              : "border-[#d7e6f3] bg-[#EFF7FC] text-[#2365aa]"
                          }`}
                        >
                          {industry}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-[#5a5a5a]">Visibility</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDemoForm((prev) => ({ ...prev, isPublic: true }))}
                      className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        demoForm.isPublic
                          ? "border-[#113d77] bg-[#113d77] text-white"
                          : "border-[#d7e6f3] bg-[#EFF7FC] text-[#2365aa]"
                      }`}
                    >
                      Public
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoForm((prev) => ({ ...prev, isPublic: false }))}
                      className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        !demoForm.isPublic
                          ? "border-[#113d77] bg-[#113d77] text-white"
                          : "border-[#d7e6f3] bg-[#EFF7FC] text-[#2365aa]"
                      }`}
                    >
                      Private
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-[#848b9b]">
                    Public demos appear on the website. Private demos are only visible in this admin panel.
                  </p>
                </div>

                {demoError ? (
                  <p className="mt-4 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                    {demoError}
                  </p>
                ) : null}
                {demoSuccess ? (
                  <p className="mt-4 rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a]">
                    {demoSuccess}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={demoSaving}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {demoSaving
                    ? "Saving..."
                    : editingDemo
                      ? "Update demo"
                      : "Add demo"}
                  <ArrowUpRight size={16} />
                </button>
              </form>

              {demosLoadError ? (
                <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {demosLoadError}
                </p>
              ) : null}
              {demosLoading ? (
                <p className="text-sm text-[#848b9b]">Loading demos...</p>
              ) : null}

              <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
                {demos.map((demo) => (
                  <article
                    key={demo.id}
                    className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#d7e6f3] bg-white shadow-[0_12px_30px_-22px_rgba(17,61,119,0.35)] xl:rounded-[20px]"
                  >
                    <div className="relative">
                      <img
                        src={demo.thumbnailUrl || youtubeThumb(demo.videoId)}
                        alt=""
                        className="aspect-video w-full shrink-0 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setPlayingDemo(demo)}
                        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-[#0b1220]/25 transition hover:bg-[#0b1220]/40"
                        aria-label={`Play ${demo.title}`}
                      >
                        <span className="flex size-12 items-center justify-center rounded-full bg-white/95 text-[#2365aa]">
                          <Play size={22} className="ml-0.5" />
                        </span>
                      </button>
                      <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                          demo.isPublic
                            ? "bg-[#e8f6ee] text-[#1d5c3a]"
                            : "bg-[#fff4e5] text-[#9a6700]"
                        }`}
                      >
                        {demo.isPublic ? "Public" : "Private"}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="m-0 min-h-[3rem] text-base font-bold leading-snug text-[#1F2432]">
                        {demo.title}
                      </h3>
                      <div className="mt-2 flex min-h-[3.25rem] flex-wrap content-start gap-1.5">
                        {demo.industries.map((industry) => (
                          <span
                            key={industry}
                            className="rounded-full bg-[#EFF7FC] px-2.5 py-1 text-[11px] font-semibold text-[#2365aa]"
                          >
                            {industry}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        <button
                          type="button"
                          onClick={() => setPlayingDemo(demo)}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-white px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Play size={14} />
                          Play
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await toggleDemoVisibility(demo.id, !demo.isPublic);
                              void refreshDemos();
                            } catch (err) {
                              setDemoError(
                                getErrorMessage(err, "Unable to update visibility."),
                              );
                            }
                          }}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          {demo.isPublic ? <EyeOff size={14} /> : <Eye size={14} />}
                          {demo.isPublic ? "Make private" : "Make public"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditDemo(demo)}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!window.confirm(`Delete "${demo.title}"?`)) return;
                            try {
                              await deleteDemo(demo.id);
                              void refreshDemos();
                            } catch (err) {
                              setDemoError(
                                getErrorMessage(err, "Unable to delete demo."),
                              );
                            }
                          }}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "blogs" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <form
                onSubmit={submitBlog}
                className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 2xl:mb-5">
                  <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                    {editingBlog ? "Update blog" : "Add blog post"}
                  </h2>
                  {editingBlog ? (
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa]"
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Title
                    <input
                      value={blogForm.title}
                      onChange={(event) =>
                        setBlogForm((prev) => ({ ...prev, title: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="Blog title"
                    />
                  </label>
                  <div className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Content
                    <BlogRichTextEditor
                      value={blogForm.description}
                      onChange={(html) =>
                        setBlogForm((prev) => ({ ...prev, description: html }))
                      }
                      placeholder="Write the blog content here..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-[#5a5a5a]">
                    Cover image {editingBlog ? "(optional — leave unchanged to keep current)" : "(required)"}
                  </p>
                  <div className="flex flex-wrap items-start gap-4">
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC]">
                      Choose image
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          setBlogImageFile(file);
                          setBlogImagePreview(file ? URL.createObjectURL(file) : blogImagePreview);
                        }}
                      />
                    </label>
                    {blogImagePreview ? (
                      <img
                        src={blogImagePreview}
                        alt="Blog cover preview"
                        className="h-24 w-40 rounded-[10px] border border-[#d7e6f3] object-cover"
                      />
                    ) : null}
                  </div>
                </div>

                {blogError ? (
                  <p className="mt-4 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                    {blogError}
                  </p>
                ) : null}
                {blogSuccess ? (
                  <p className="mt-4 rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a]">
                    {blogSuccess}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={blogSaving}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {blogSaving ? "Saving..." : editingBlog ? "Update blog" : "Publish blog"}
                  <ArrowUpRight size={16} />
                </button>
              </form>

              {blogsLoadError ? (
                <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {blogsLoadError}
                </p>
              ) : null}
              {blogsLoading ? (
                <p className="text-sm text-[#848b9b]">Loading blogs...</p>
              ) : null}

              <div className="space-y-3">
                {blogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="rounded-[18px] border border-[#d7e6f3] bg-white p-4 shadow-[0_12px_30px_-22px_rgba(17,61,119,0.35)] sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex min-w-0 flex-1 gap-4">
                        {blog.imageUrl ? (
                          <img
                            src={blog.imageUrl}
                            alt=""
                            className="size-20 shrink-0 rounded-[12px] object-cover"
                          />
                        ) : null}
                        <div className="min-w-0">
                          <h3 className="m-0 text-lg font-bold text-[#1F2432]">{blog.title}</h3>
                          <p className="mt-1 text-xs text-[#848b9b]">
                            {formatDate(blog.createdAt)}
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#687181]">
                            {excerptFromContent(blog.description)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onEditBlog(blog)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!window.confirm(`Delete "${blog.title}"?`)) return;
                            try {
                              await deleteBlog(blog.id);
                              void refreshBlogs();
                            } catch (err) {
                              setBlogError(
                                getErrorMessage(err, "Unable to delete blog."),
                              );
                            }
                          }}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "tags" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <form
                onSubmit={submitTag}
                className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 2xl:mb-5">
                  <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                    {editingTag ? "Update demo tag" : "Add demo tag"}
                  </h2>
                  {editingTag ? (
                    <button
                      type="button"
                      onClick={resetTagForm}
                      className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa]"
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-[#848b9b]">
                  Tags are used to categorize demo videos on the website and in the admin panel.
                </p>

                <label className="mt-5 flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                  Tag name
                  <input
                    value={tagName}
                    onChange={(event) => setTagName(event.target.value)}
                    className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                    placeholder="e.g. Healthcare and Life Sciences"
                  />
                </label>

                {tagError ? (
                  <p className="mt-4 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                    {tagError}
                  </p>
                ) : null}
                {tagSuccess ? (
                  <p className="mt-4 rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a]">
                    {tagSuccess}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={tagSaving}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {tagSaving ? "Saving..." : editingTag ? "Update tag" : "Add tag"}
                  <ArrowUpRight size={16} />
                </button>
              </form>

              {tagsLoadError || adminTagsLoadError ? (
                <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {tagsLoadError || adminTagsLoadError}
                </p>
              ) : null}
              {tagsLoading || adminTagsLoading ? (
                <p className="text-sm text-[#848b9b]">Loading tags...</p>
              ) : null}

              <div className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8">
                <h3 className="m-0 text-lg font-bold text-[#1F2432]">All tags ({adminDemoTags.length})</h3>
                <div className="mt-4 space-y-3">
                  {adminDemoTags.map((tag) => (
                    <article
                      key={tag.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#d7e6f3] bg-[#f8fbfd] px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="m-0 text-sm font-semibold text-[#1F2432]">{tag.name}</p>
                        <p className="mt-1 text-xs text-[#848b9b]">
                          Added {formatDate(tag.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onEditTag(tag)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!window.confirm(`Delete tag "${tag.name}"?`)) return;
                            try {
                              await deleteDemoTag(tag.id);
                              if (editingTagId === tag.id) resetTagForm();
                              setTagSuccess(`Tag "${tag.name}" deleted successfully.`);
                              void refreshTags();
                              void refreshAdminTags();
                            } catch (err) {
                              setTagError(getErrorMessage(err, "Unable to delete tag."));
                            }
                          }}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {tab === "jobs" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <form
                onSubmit={submitJob}
                className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 2xl:mb-5">
                  <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                    {editingJob ? "Update job posting" : "Add job posting"}
                  </h2>
                  {editingJob ? (
                    <button
                      type="button"
                      onClick={resetJobForm}
                      className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa]"
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Job title
                    <input
                      value={jobForm.title}
                      onChange={(event) =>
                        setJobForm((prev) => ({ ...prev, title: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="e.g. ML Engineer"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Tag
                    <input
                      value={jobForm.tag}
                      onChange={(event) =>
                        setJobForm((prev) => ({ ...prev, tag: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="e.g. Software"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] md:col-span-2">
                    Description
                    <textarea
                      value={jobForm.description}
                      onChange={(event) =>
                        setJobForm((prev) => ({ ...prev, description: event.target.value }))
                      }
                      rows={3}
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="Short role description"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Employment type
                    <input
                      value={jobForm.type}
                      onChange={(event) =>
                        setJobForm((prev) => ({ ...prev, type: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="Full-time"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Location
                    <input
                      value={jobForm.location}
                      onChange={(event) =>
                        setJobForm((prev) => ({ ...prev, location: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="Remotely"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Category
                    <input
                      value={jobForm.category}
                      onChange={(event) =>
                        setJobForm((prev) => ({ ...prev, category: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="Software Development"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] md:col-span-2">
                    Category subtitle
                    <input
                      value={jobForm.categorySubtitle}
                      onChange={(event) =>
                        setJobForm((prev) => ({
                          ...prev,
                          categorySubtitle: event.target.value,
                        }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="Open position in our software team."
                    />
                  </label>
                </div>

                {jobError ? (
                  <p className="mt-4 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                    {jobError}
                  </p>
                ) : null}
                {jobSuccess ? (
                  <p className="mt-4 rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a]">
                    {jobSuccess}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490]"
                >
                  {editingJob ? "Update job" : "Add job"}
                  <ArrowUpRight size={16} />
                </button>
              </form>

              <div className="space-y-3">
                {jobs.map((job) => (
                  <article
                    key={job.id}
                    className="rounded-[18px] border border-[#d7e6f3] bg-white p-4 shadow-[0_12px_30px_-22px_rgba(17,61,119,0.35)] sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#2365aa]">
                          {job.category}
                        </p>
                        <h3 className="m-0 mt-1 text-lg font-bold text-[#1F2432]">{job.title}</h3>
                        <p className="mt-2 max-w-[52rem] text-sm leading-6 text-[#687181]">
                          {job.description}
                        </p>
                        <p className="mt-2 text-xs text-[#848b9b]">
                          {job.type} · {job.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => onEditJob(job)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete "${job.title}"?`)) deleteJob(job.id);
                          }}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "applications" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <div className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                      Manage Applications
                    </h2>
                    <p className="mt-1 text-sm text-[#848b9b] 2xl:text-base">
                      Career enquiry submissions from the public Careers page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void loadApplications()}
                    disabled={applicationsLoading}
                    className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2 text-xs font-semibold text-[#2365aa] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
                  >
                    {applicationsLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
              </div>

              {applicationsError ? (
                <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {applicationsError}
                </p>
              ) : null}

              {applicationsLoading && applications.length === 0 ? (
                <p className="text-sm text-[#848b9b]">Loading applications...</p>
              ) : null}

              {!applicationsLoading && applications.length === 0 && !applicationsError ? (
                <div className="rounded-[20px] border border-[#d7e6f3] bg-[#EFF7FC] px-6 py-14 text-center">
                  <p className="m-0 text-sm text-[#687181] 2xl:text-base">
                    No career applications yet.
                  </p>
                </div>
              ) : null}

              <div className="space-y-3 sm:space-y-4">
                {applications.map((application) => (
                  <article
                    key={application.id}
                    className="rounded-[18px] border border-[#d7e6f3] bg-white p-4 shadow-[0_12px_30px_-22px_rgba(17,61,119,0.35)] sm:p-5 xl:rounded-[20px] xl:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="m-0 text-lg font-bold text-[#1F2432]">
                            {application.fullName}
                          </h3>
                          {application.jobTitle ? (
                            <span className="rounded-full bg-[#EFF7FC] px-2.5 py-1 text-[11px] font-semibold text-[#2365aa]">
                              {application.jobTitle}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-xs text-[#848b9b]">
                          Submitted {formatDate(application.createdAt)}
                        </p>

                        <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#5a5a5a] sm:grid-cols-2">
                          <p className="m-0">
                            <span className="font-semibold text-[#1F2432]">Email:</span>{" "}
                            <a
                              href={`mailto:${application.email}`}
                              className="text-[#2365aa] no-underline hover:underline"
                            >
                              {application.email}
                            </a>
                          </p>
                          <p className="m-0">
                            <span className="font-semibold text-[#1F2432]">Phone:</span>{" "}
                            <a
                              href={`tel:${application.phone}`}
                              className="text-[#2365aa] no-underline hover:underline"
                            >
                              {application.phone}
                            </a>
                          </p>
                          {application.education ? (
                            <p className="m-0">
                              <span className="font-semibold text-[#1F2432]">Education:</span>{" "}
                              {application.education}
                            </p>
                          ) : null}
                          {application.expertise ? (
                            <p className="m-0">
                              <span className="font-semibold text-[#1F2432]">Expertise:</span>{" "}
                              {application.expertise}
                            </p>
                          ) : null}
                        </div>

                        {application.message ? (
                          <p className="mt-3 text-sm leading-6 text-[#687181]">
                            {application.message}
                          </p>
                        ) : null}

                        {application.cvUrl ? (
                          <a
                            href={application.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa] no-underline hover:bg-[#e5eef7]"
                          >
                            <ExternalLink size={14} />
                            {application.cvFilename || "View CV"}
                          </a>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => void onDeleteApplication(application)}
                        disabled={deletingApplicationId === application.id}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3 py-2 text-xs font-semibold text-[#2365aa] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <Trash2 size={14} />
                        {deletingApplicationId === application.id
                          ? "Removing..."
                          : "Remove"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>

      {playingDemo ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b1220]/72 p-4 backdrop-blur-[2px] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={playingDemo.title}
          onClick={() => setPlayingDemo(null)}
        >
          <div
            className="relative w-full max-w-[960px] overflow-hidden rounded-[20px] bg-[#0b1220] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <h3 className="m-0 truncate text-sm font-semibold text-white sm:text-base">
                {playingDemo.title}
              </h3>
              <button
                type="button"
                onClick={() => setPlayingDemo(null)}
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={playingDemo.videoId}
                src={youtubeEmbed(playingDemo.videoId)}
                title={playingDemo.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
