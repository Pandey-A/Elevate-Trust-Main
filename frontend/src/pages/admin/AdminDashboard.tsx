import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Check,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  LayoutDashboard,
  ListFilter,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  Search,
  Tags,
  Trash2,
  Quote,
  Video,
  X,
} from "lucide-react";
import { type AdminDemo, type AdminJob, type IndustryTag } from "../../data/adminDefaults";
import { useAdminAuth, useAdminBlogs, useAdminDemos, useAdminJobs, useAdminDemoTags, useAdminTestimonials, useDemoTags } from "../../hooks/useAdminData";
import {
  createId,
  deleteJob,
  extractYoutubeId,
  upsertJob,
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
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  type Testimonial,
} from "../../lib/testimonialsApi";
import {
  deleteCareerApplication,
  fetchCareerApplications,
  type CareerApplication,
} from "../../lib/careersApi";
import { createDemoTag, deleteDemoTag, updateDemoTag, type DemoTag } from "../../lib/tagsApi";
import BlogRichTextEditor from "../../components/blog/BlogRichTextEditor";
import DemoPlayCover from "../../components/DemoPlayCover";
import { excerptFromContent, isRichTextEmpty } from "../../lib/blogContent";
import brainstormingIcon from "../../assets/OurServices/brainstorming.png";
import analysisIcon from "../../assets/OurServices/analysis.png";
import elevateLogo from "../../assets/nav/elevate-logo.svg";

type Tab = "overview" | "demos" | "blogs" | "testimonials" | "tags" | "jobs" | "applications";

const emptyDemoForm = {
  id: "",
  title: "",
  youtubeUrl: "",
  industries: [] as IndustryTag[],
  isPublic: true,
};

const emptyBlogForm = {
  id: "",
  title: "",
  description: "",
};

const emptyTestimonialForm = {
  id: "",
  name: "",
  title: "",
  quote: "",
  fullQuote: "",
  sortOrder: "0",
};

function youtubeEmbed(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    playsinline: "1",
    fs: "1",
    disablekb: "0",
    cc_load_policy: "0",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
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
  const {
    testimonials,
    loading: testimonialsLoading,
    error: testimonialsLoadError,
    refresh: refreshTestimonials,
  } = useAdminTestimonials();
  const { tags: demoTags, loading: tagsLoading, error: tagsLoadError, refresh: refreshTags } = useDemoTags();
  const { tags: adminDemoTags, loading: adminTagsLoading, error: adminTagsLoadError, refresh: refreshAdminTags } = useAdminDemoTags();
  const jobs = useAdminJobs();

  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [showHomeStats, setShowHomeStats] = useState(false);
  const [homeDemoSearch, setHomeDemoSearch] = useState("");
  const [homeTitleFilter, setHomeTitleFilter] = useState("All");
  const [homeTitleMenuOpen, setHomeTitleMenuOpen] = useState(false);
  const [homeTitleMenuPos, setHomeTitleMenuPos] = useState({ top: 0, right: 0 });
  const homeTitleMenuRef = useRef<HTMLDivElement>(null);
  const homeTitleButtonRef = useRef<HTMLButtonElement>(null);
  const [demoForm, setDemoForm] = useState(emptyDemoForm);
  const [demoThumbnailFile, setDemoThumbnailFile] = useState<File | null>(null);
  const [demoThumbnailPreview, setDemoThumbnailPreview] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonialForm);
  const [testimonialLogoFile, setTestimonialLogoFile] = useState<File | null>(null);
  const [testimonialLogoPreview, setTestimonialLogoPreview] = useState<string | null>(null);
  const [testimonialProfileFile, setTestimonialProfileFile] = useState<File | null>(null);
  const [testimonialProfilePreview, setTestimonialProfilePreview] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState(emptyJobForm);
  const [demoError, setDemoError] = useState("");
  const [blogError, setBlogError] = useState("");
  const [testimonialError, setTestimonialError] = useState("");
  const [jobError, setJobError] = useState("");
  const [demoSuccess, setDemoSuccess] = useState("");
  const [blogSuccess, setBlogSuccess] = useState("");
  const [testimonialSuccess, setTestimonialSuccess] = useState("");
  const [jobSuccess, setJobSuccess] = useState("");
  const [demoSaving, setDemoSaving] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSearch, setDemoSearch] = useState("");
  const [demoCategoryFilter, setDemoCategoryFilter] = useState("All");
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [testimonialSaving, setTestimonialSaving] = useState(false);
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
    if (!homeTitleMenuOpen) return;

    const closeMenu = () => setHomeTitleMenuOpen(false);

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        homeTitleMenuRef.current?.contains(target) ||
        homeTitleButtonRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    // Close on any scroll so the card never gets stuck/cut at the top
    window.addEventListener("scroll", closeMenu, true);
    window.addEventListener("resize", closeMenu);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", closeMenu, true);
      window.removeEventListener("resize", closeMenu);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [homeTitleMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!session) return;
    void loadApplications();
  }, [session, loadApplications]);

  useEffect(() => {
    if (!playingDemo && !demoModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPlayingDemo(null);
      if (demoModalOpen) {
        setDemoModalOpen(false);
        setTagDropdownOpen(false);
        setDemoForm(emptyDemoForm);
        setDemoThumbnailFile(null);
        setDemoThumbnailPreview(null);
        setDemoError("");
        setDemoSuccess("");
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [playingDemo, demoModalOpen]);

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

  const resetTestimonialForm = () => {
    setTestimonialForm(emptyTestimonialForm);
    setTestimonialLogoFile(null);
    setTestimonialLogoPreview(null);
    setTestimonialProfileFile(null);
    setTestimonialProfilePreview(null);
    setTestimonialError("");
    setTestimonialSuccess("");
  };

  const onEditTestimonial = (item: Testimonial) => {
    setTab("testimonials");
    setTestimonialForm({
      id: item.id,
      name: item.name,
      title: item.title,
      quote: item.quote,
      fullQuote: item.fullQuote || "",
      sortOrder: String(item.sortOrder ?? 0),
    });
    setTestimonialLogoFile(null);
    setTestimonialLogoPreview(item.logoUrl || null);
    setTestimonialProfileFile(null);
    setTestimonialProfilePreview(item.profileUrl || null);
    setTestimonialSuccess("");
    setTestimonialError("");
  };

  const editingDemo = Boolean(demoForm.id);
  const editingBlog = Boolean(blogForm.id);
  const editingTestimonial = Boolean(testimonialForm.id);
  const editingJob = Boolean(jobForm.id);

  const filteredDemos = useMemo(() => {
    const query = demoSearch.trim().toLowerCase();
    return demos.filter((demo) => {
      const matchesTitle = !query || demo.title.toLowerCase().includes(query);
      const matchesCategory =
        demoCategoryFilter === "All" ||
        demo.industries.some(
          (industry) => industry.toLowerCase() === demoCategoryFilter.toLowerCase(),
        );
      return matchesTitle && matchesCategory;
    });
  }, [demos, demoSearch, demoCategoryFilter]);

  const homeDemoTitles = useMemo(() => {
    const titles = Array.from(new Set(demos.map((demo) => demo.title.trim()).filter(Boolean)));
    return titles.sort((a, b) => a.localeCompare(b));
  }, [demos]);

  const homeFilteredDemos = useMemo(() => {
    const query = homeDemoSearch.trim().toLowerCase();
    return demos.filter((demo) => {
      const matchesSearch = !query || demo.title.toLowerCase().includes(query);
      const matchesTitle =
        homeTitleFilter === "All" ||
        demo.title.trim().toLowerCase() === homeTitleFilter.trim().toLowerCase();
      return matchesSearch && matchesTitle;
    });
  }, [demos, homeDemoSearch, homeTitleFilter]);

  const homeFilterActive =
    homeDemoSearch.trim().length > 0 || homeTitleFilter !== "All";

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
    setTagDropdownOpen(false);
  };

  const closeDemoModal = () => {
    setDemoModalOpen(false);
    resetDemoForm();
  };

  const openAddDemoModal = () => {
    resetDemoForm();
    setDemoModalOpen(true);
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
    setTagDropdownOpen(false);
    setDemoModalOpen(true);
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
      } else {
        await createDemo({ id: createId("demo"), ...payload });
      }
      const successMessage = editingDemo
        ? "Demo updated successfully."
        : "Demo added successfully.";
      setDemoModalOpen(false);
      resetDemoForm();
      setDemoSuccess(successMessage);
      void refreshDemos();
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

  const submitTestimonial = async (event: FormEvent) => {
    event.preventDefault();
    setTestimonialError("");
    setTestimonialSuccess("");

    if (!testimonialForm.name.trim()) {
      setTestimonialError("Person name is required.");
      return;
    }
    if (!testimonialForm.title.trim()) {
      setTestimonialError("Position / title is required.");
      return;
    }
    if (!testimonialForm.quote.trim()) {
      setTestimonialError("Testimonial quote is required.");
      return;
    }
    if (!editingTestimonial && !testimonialProfileFile) {
      setTestimonialError("Profile image is required.");
      return;
    }

    const sortOrder = Number(testimonialForm.sortOrder);
    const payload = {
      name: testimonialForm.name.trim(),
      title: testimonialForm.title.trim(),
      quote: testimonialForm.quote.trim(),
      fullQuote: testimonialForm.fullQuote.trim(),
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      logoFile: testimonialLogoFile,
      profileFile: testimonialProfileFile,
    };

    try {
      setTestimonialSaving(true);
      if (editingTestimonial) {
        await updateTestimonial(testimonialForm.id, payload);
        resetTestimonialForm();
        setTestimonialSuccess("Testimonial updated successfully.");
      } else {
        await createTestimonial({
          id: createId("testimonial"),
          ...payload,
          profileFile: testimonialProfileFile!,
        });
        resetTestimonialForm();
        setTestimonialSuccess("Testimonial created successfully.");
      }
      setTestimonialError("");
      void refreshTestimonials();
    } catch (err) {
      setTestimonialError(getErrorMessage(err, "Unable to save testimonial."));
    } finally {
      setTestimonialSaving(false);
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

  const selectTab = (next: Tab) => {
    setTab(next);
    setHomeTitleMenuOpen(false);
    // Collapse drawer on small screens so content stays usable
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <header className="sticky top-0 z-40 border-b border-[#d7e6f3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1692px] flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-8 sm:py-4 lg:px-10 xl:px-12 2xl:py-5">
          <div className="min-w-0">
            <Link to="/" className="inline-flex items-center no-underline">
              <img
                src={elevateLogo}
                alt="Elevate Trust"
                className="h-7 w-auto sm:h-8 lg:h-9"
              />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
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

      {!sidebarCollapsed ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-[45] border-0 bg-[#0b1220]/45 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      ) : null}

      <div
        className={`mx-auto grid w-full max-w-[1692px] grid-cols-1 gap-4 py-4 transition-all duration-300 ease-out sm:gap-6 sm:py-6 xl:gap-8 2xl:gap-10 2xl:py-8 ${
          sidebarCollapsed
            ? "pl-[72px] pr-4 sm:pl-[76px] sm:pr-6 lg:px-8 lg:pl-[88px] xl:px-10 xl:pl-[92px] 2xl:pl-[96px]"
            : "pl-[72px] pr-4 sm:pl-[76px] sm:pr-6 lg:px-8 lg:pl-[240px] xl:px-10 xl:pl-[280px] 2xl:pl-[300px]"
        }`}
      >
        <aside
          className={`fixed left-2 top-20 z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto border border-[#d7e6f3] bg-white shadow-[0_14px_40px_-28px_rgba(17,61,119,0.35)] transition-all duration-300 ease-out [scrollbar-width:thin] sm:left-3 lg:top-1/2 lg:max-h-[min(90dvh,calc(100dvh-2rem))] lg:-translate-y-1/2 ${
            sidebarCollapsed
              ? "w-[56px] rounded-[16px] p-1.5 sm:w-[60px] xl:rounded-[18px]"
              : "w-[min(210px,calc(100vw-1.5rem))] rounded-[20px] p-2 sm:p-3 xl:w-[248px] xl:rounded-[24px] 2xl:w-[268px] 2xl:p-4"
          }`}
        >
          <div
            className={`mb-2.5 flex border-b border-[#e8eef3] pb-2.5 ${
              sidebarCollapsed ? "justify-center" : "justify-end"
            }`}
          >
            <button
              type="button"
              onClick={() => setSidebarCollapsed((open) => !open)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!sidebarCollapsed}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`inline-flex cursor-pointer items-center justify-center gap-1.5 border-0 font-semibold transition ${
                sidebarCollapsed
                  ? "size-10 rounded-full bg-[#113d77] text-white shadow-[0_8px_18px_-10px_rgba(17,61,119,0.9)] hover:bg-[#0e3262]"
                  : "h-9 rounded-full bg-[#EFF7FC] px-3 text-[#113d77] hover:bg-[#e5eef7]"
              }`}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={18} strokeWidth={2.25} />
              ) : (
                <>
                  <PanelLeftClose size={16} strokeWidth={2.25} />
                  <span className="text-xs">Collapse</span>
                </>
              )}
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {(
              [
                ["overview", "Home", LayoutDashboard],
                ["demos", "Manage Demos", Video],
                ["blogs", "Manage Blogs", BookOpen],
                ["testimonials", "Manage Testimonials", Quote],
                ["tags", "Manage Tags", Tags],
                ["jobs", "Manage Jobs", Briefcase],
                ["applications", "Manage Applications", FileText],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => selectTab(id)}
                title={label}
                aria-label={label}
                className={`mb-0 flex w-full shrink-0 cursor-pointer items-center justify-start rounded-[12px] border-0 text-left text-sm font-semibold transition-all duration-300 ease-out 2xl:rounded-[14px] 2xl:text-base ${
                  sidebarCollapsed
                    ? "gap-0 px-2.5 py-2.5"
                    : "gap-2.5 px-3.5 py-2.5 lg:gap-3 lg:px-3.5 lg:py-3 2xl:px-4 2xl:py-3.5"
                } ${
                  tab === id
                    ? "bg-[#113d77] text-white"
                    : "bg-transparent text-[#5a5a5a] hover:bg-[#EFF7FC]"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                    sidebarCollapsed
                      ? "max-w-0 opacity-0 pointer-events-none"
                      : "max-w-[12rem] opacity-100"
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0 overflow-x-hidden">
          {tab === "overview" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <div className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 sm:p-6 xl:rounded-[24px] 2xl:p-8">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <h2 className="m-0 shrink-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                    Quick actions
                  </h2>

                  <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center xl:w-auto xl:flex-1 xl:justify-end">
                    <label className="relative w-full min-w-0 sm:min-w-[180px] sm:max-w-[260px] sm:flex-1 xl:max-w-[240px]">
                      <Search
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a94a6]"
                      />
                      <input
                        value={homeDemoSearch}
                        onChange={(event) => setHomeDemoSearch(event.target.value)}
                        className="h-10 w-full rounded-full border border-[#d7e6f3] bg-[#f7fafc] pl-9 pr-3 text-sm text-[#1F2432] outline-none transition placeholder:text-[#9aa3b2] focus:border-[#2365aa] focus:bg-white focus:ring-2 focus:ring-[#2365aa]/10 sm:h-9"
                        placeholder="Search demos…"
                        aria-label="Search demos by title"
                      />
                    </label>

                    <div className="flex w-full items-center gap-2 sm:w-auto">
                      <div className="relative min-w-0 flex-1 sm:flex-none">
                        <button
                          ref={homeTitleButtonRef}
                          type="button"
                          onClick={() => {
                            const button = homeTitleButtonRef.current;
                            if (button) {
                              const rect = button.getBoundingClientRect();
                              setHomeTitleMenuPos({
                                top: rect.bottom + 6,
                                right: Math.max(12, window.innerWidth - rect.right),
                              });
                            }
                            setHomeTitleMenuOpen((open) => !open);
                          }}
                          className={`inline-flex h-10 w-full max-w-none cursor-pointer items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition sm:h-9 sm:w-auto sm:max-w-[210px] sm:justify-start ${
                            homeTitleFilter === "All"
                              ? "border-[#d7e6f3] bg-[#EFF7FC] text-[#2365aa] hover:bg-[#e7f2fb]"
                              : "border-[#2365aa] bg-[#2365aa] text-white hover:bg-[#1a5490]"
                          }`}
                          aria-haspopup="listbox"
                          aria-expanded={homeTitleMenuOpen}
                        >
                          <ListFilter size={14} className="shrink-0" />
                          <span className="truncate">
                            {homeTitleFilter === "All" ? "All titles" : homeTitleFilter}
                          </span>
                          <ChevronDown
                            size={14}
                            className={`shrink-0 transition-transform ${
                              homeTitleMenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {homeTitleMenuOpen
                          ? createPortal(
                              <div
                                ref={homeTitleMenuRef}
                                role="listbox"
                                style={{
                                  top: homeTitleMenuPos.top,
                                  right: homeTitleMenuPos.right,
                                }}
                                className="fixed z-[250] max-h-[min(60vh,420px)] w-[min(480px,calc(100vw-24px))] overflow-y-auto rounded-xl border border-[#d7e6f3] bg-white p-2.5 shadow-[0_22px_50px_-18px_rgba(17,61,119,0.55)] [scrollbar-width:thin]"
                              >
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={homeTitleFilter === "All"}
                                  onClick={() => {
                                    setHomeTitleFilter("All");
                                    setHomeTitleMenuOpen(false);
                                  }}
                                  className={`mb-1.5 flex w-full cursor-pointer items-center justify-between rounded-lg border-0 px-3 py-2 text-left text-sm transition ${
                                    homeTitleFilter === "All"
                                      ? "bg-[#EFF7FC] font-semibold text-[#113d77]"
                                      : "bg-transparent font-medium text-[#1F2432] hover:bg-[#f5f9fd]"
                                  }`}
                                >
                                  All titles
                                  {homeTitleFilter === "All" ? (
                                    <Check size={15} className="shrink-0 text-[#2365aa]" />
                                  ) : null}
                                </button>
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                  {homeDemoTitles.map((title) => {
                                    const active =
                                      homeTitleFilter.trim().toLowerCase() ===
                                      title.toLowerCase();
                                    return (
                                      <button
                                        key={title}
                                        type="button"
                                        role="option"
                                        aria-selected={active}
                                        onClick={() => {
                                          setHomeTitleFilter(title);
                                          setHomeTitleMenuOpen(false);
                                        }}
                                        className={`flex w-full cursor-pointer items-start justify-between gap-2 rounded-lg border-0 px-3 py-2 text-left text-sm leading-snug transition ${
                                          active
                                            ? "bg-[#EFF7FC] font-semibold text-[#113d77]"
                                            : "bg-transparent font-medium text-[#1F2432] hover:bg-[#f5f9fd]"
                                        }`}
                                      >
                                        <span className="whitespace-normal break-words">
                                          {title}
                                        </span>
                                        {active ? (
                                          <Check
                                            size={15}
                                            className="mt-0.5 shrink-0 text-[#2365aa]"
                                          />
                                        ) : null}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>,
                              document.body,
                            )
                          : null}
                      </div>

                      {homeFilterActive ? (
                        <button
                          type="button"
                          onClick={() => {
                            setHomeDemoSearch("");
                            setHomeTitleFilter("All");
                            setHomeTitleMenuOpen(false);
                          }}
                          className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#d7e6f3] bg-white text-[#5b6b82] transition hover:border-[#2365aa]/35 hover:text-[#2365aa] sm:h-9 sm:w-9"
                          aria-label="Clear filters"
                          title="Clear"
                        >
                          <X size={15} />
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => setShowHomeStats((open) => !open)}
                        className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3.5 text-xs font-semibold text-[#2365aa] sm:h-9 sm:text-sm"
                      >
                        {showHomeStats ? "Hide stats" : "Show stats"}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${showHomeStats ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 sm:gap-3 2xl:mt-5">
                  <button
                    type="button"
                    onClick={() => selectTab("demos")}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] px-4 py-2.5 text-sm font-semibold text-white sm:w-auto 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <Plus size={16} />
                    Add demo
                  </button>
                  <button
                    type="button"
                    onClick={() => selectTab("blogs")}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2.5 text-sm font-semibold text-[#2365aa] sm:w-auto 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <Plus size={16} />
                    Add blog
                  </button>
                  <button
                    type="button"
                    onClick={() => selectTab("testimonials")}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2.5 text-sm font-semibold text-[#2365aa] sm:w-auto 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <Plus size={16} />
                    Add testimonial
                  </button>
                  <button
                    type="button"
                    onClick={() => selectTab("jobs")}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2.5 text-sm font-semibold text-[#2365aa] sm:w-auto 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <Plus size={16} />
                    Add job posting
                  </button>
                  <button
                    type="button"
                    onClick={() => selectTab("applications")}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-4 py-2.5 text-sm font-semibold text-[#2365aa] sm:w-auto 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <FileText size={16} />
                    View applications
                  </button>
                </div>

                {showHomeStats ? (
                  <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#e8eef3] pt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
                    {[
                      { label: "Total demos", value: demos.length, icon: brainstormingIcon },
                      { label: "Total blogs", value: blogs.length, icon: analysisIcon },
                      { label: "Testimonials", value: testimonials.length, icon: brainstormingIcon },
                      { label: "Demo tags", value: demoTags.length, icon: analysisIcon },
                      { label: "Open jobs", value: jobs.length, icon: brainstormingIcon },
                      {
                        label: "Applications",
                        value: applications.length,
                        icon: analysisIcon,
                      },
                    ].map((card) => (
                      <article
                        key={card.label}
                        className="rounded-[16px] border border-[#d7e6f3] bg-[#EFF7FC] p-4"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5">
                          <img src={card.icon} alt="" aria-hidden className="h-6 w-6 object-contain" />
                        </div>
                        <p className="m-0 text-xs text-[#848b9b] sm:text-sm">{card.label}</p>
                        <p className="mt-1 text-2xl font-bold text-[#113d77]">{card.value}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>

              <div>
                {demosLoading ? (
                  <p className="text-sm text-[#848b9b]">Loading demos...</p>
                ) : null}
                {demosLoadError ? (
                  <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                    {demosLoadError}
                  </p>
                ) : null}
                {!demosLoading && demos.length === 0 ? (
                  <div className="rounded-[20px] border border-[#d7e6f3] bg-white px-6 py-14 text-center">
                    <p className="m-0 text-sm text-[#687181]">No demos yet.</p>
                  </div>
                ) : null}
                {!demosLoading && demos.length > 0 && homeFilteredDemos.length === 0 ? (
                  <div className="rounded-[20px] border border-[#d7e6f3] bg-white px-6 py-14 text-center">
                    <p className="m-0 text-sm text-[#687181]">
                      No demos match your search or title filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setHomeDemoSearch("");
                        setHomeTitleFilter("All");
                      }}
                      className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#EFF7FC] px-4 py-2 text-sm font-semibold text-[#2365aa]"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : null}

                <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
                  {homeFilteredDemos.map((demo) => (
                    <article
                      key={demo.id}
                      className="overflow-hidden rounded-[18px] border border-[#d7e6f3] bg-white shadow-[0_12px_30px_-22px_rgba(17,61,119,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(17,61,119,0.45)] xl:rounded-[20px]"
                    >
                      <DemoPlayCover
                        demo={demo}
                        compact
                        showTitle
                        onPlay={() => setPlayingDemo(demo)}
                      />
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {tab === "demos" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
                <div>
                  <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">Manage Demos</h2>
                  <p className="mt-1 text-sm text-[#848b9b]">
                    Showing {filteredDemos.length} of {demos.length} demos
                  </p>
                </div>

                <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:flex-wrap md:items-center">
                  <label className="relative min-w-0 w-full md:min-w-[220px] md:max-w-[280px] md:flex-1">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#848b9b]"
                    />
                    <input
                      value={demoSearch}
                      onChange={(event) => setDemoSearch(event.target.value)}
                      className="w-full rounded-full border border-[#d7e6f3] bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-[#2365aa]"
                      placeholder="Search by title..."
                    />
                  </label>

                  <label className="relative min-w-0 w-full md:min-w-[200px]">
                    <span className="sr-only">Filter by category</span>
                    <select
                      value={demoCategoryFilter}
                      onChange={(event) => setDemoCategoryFilter(event.target.value)}
                      className="w-full appearance-none rounded-full border border-[#d7e6f3] bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-[#1F2432] outline-none focus:border-[#2365aa]"
                    >
                      <option value="All">All categories</option>
                      {demoTags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#848b9b]"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={openAddDemoModal}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1a5490] md:w-auto"
                  >
                    <Plus size={16} />
                    Add Demo
                  </button>
                </div>
              </div>

              {demoSuccess ? (
                <p className="rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a]">
                  {demoSuccess}
                </p>
              ) : null}
              {demoError && !demoModalOpen ? (
                <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {demoError}
                </p>
              ) : null}
              {demosLoadError ? (
                <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {demosLoadError}
                </p>
              ) : null}
              {demosLoading ? (
                <p className="text-sm text-[#848b9b]">Loading demos...</p>
              ) : null}

              {!demosLoading && filteredDemos.length === 0 ? (
                <div className="rounded-[20px] border border-[#d7e6f3] bg-white px-6 py-14 text-center shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)]">
                  <p className="m-0 text-sm text-[#687181]">
                    {demos.length === 0
                      ? "No demos yet. Click Add Demo to create one."
                      : "No demos match your search or category filter."}
                  </p>
                </div>
              ) : null}

              <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
                {filteredDemos.map((demo) => (
                  <article
                    key={demo.id}
                    className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#d7e6f3] bg-white shadow-[0_12px_30px_-22px_rgba(17,61,119,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(17,61,119,0.45)] xl:rounded-[20px]"
                  >
                    <div className="relative">
                      <DemoPlayCover
                        demo={demo}
                        showTitle
                        onPlay={() => setPlayingDemo(demo)}
                      />
                      <span
                        className={`pointer-events-none absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
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
                      <div className="mt-auto flex flex-col gap-2 pt-4 md:flex-row md:flex-wrap">
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
                          className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa] md:flex-1"
                        >
                          {demo.isPublic ? <EyeOff size={14} /> : <Eye size={14} />}
                          {demo.isPublic ? "Make private" : "Make public"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditDemo(demo)}
                          className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa] md:flex-1"
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
                          className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3 py-2 text-xs font-semibold text-[#2365aa] md:flex-1"
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

          {tab === "testimonials" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <form
                onSubmit={submitTestimonial}
                className="rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 2xl:mb-5">
                  <h2 className="m-0 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                    {editingTestimonial ? "Update testimonial" : "Add testimonial"}
                  </h2>
                  {editingTestimonial ? (
                    <button
                      type="button"
                      onClick={resetTestimonialForm}
                      className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa]"
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Person name
                    <input
                      value={testimonialForm.name}
                      onChange={(event) =>
                        setTestimonialForm((prev) => ({ ...prev, name: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="e.g. Reshu Choudhary"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                    Position / title
                    <input
                      value={testimonialForm.title}
                      onChange={(event) =>
                        setTestimonialForm((prev) => ({ ...prev, title: event.target.value }))
                      }
                      className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                      placeholder="e.g. Co-Founder, ComplyCore"
                    />
                  </label>
                </div>

                <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                  Quote
                  <textarea
                    value={testimonialForm.quote}
                    onChange={(event) =>
                      setTestimonialForm((prev) => ({ ...prev, quote: event.target.value }))
                    }
                    rows={4}
                    className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                    placeholder="Short quote shown on the card"
                  />
                </label>

                <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                  Full quote (optional)
                  <textarea
                    value={testimonialForm.fullQuote}
                    onChange={(event) =>
                      setTestimonialForm((prev) => ({ ...prev, fullQuote: event.target.value }))
                    }
                    rows={5}
                    className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                    placeholder="Longer version shown in the More modal. Separate paragraphs with a blank line."
                  />
                </label>

                <label className="mt-4 flex max-w-[220px] flex-col gap-1.5 text-sm font-medium text-[#5a5a5a]">
                  Sort order
                  <input
                    type="number"
                    value={testimonialForm.sortOrder}
                    onChange={(event) =>
                      setTestimonialForm((prev) => ({ ...prev, sortOrder: event.target.value }))
                    }
                    className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 outline-none focus:border-[#2365aa]"
                  />
                </label>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-[#5a5a5a]">
                      Company logo {editingTestimonial ? "(optional)" : "(optional)"}
                    </p>
                    <div className="flex flex-wrap items-start gap-4">
                      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC]">
                        Choose logo
                        <input
                          type="file"
                          accept="image/*,.svg"
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            setTestimonialLogoFile(file);
                            setTestimonialLogoPreview(
                              file ? URL.createObjectURL(file) : testimonialLogoPreview,
                            );
                          }}
                        />
                      </label>
                      {testimonialLogoPreview ? (
                        <img
                          src={testimonialLogoPreview}
                          alt="Logo preview"
                          className="h-16 w-28 rounded-[10px] border border-[#d7e6f3] object-contain bg-white p-2"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-[#5a5a5a]">
                      Profile image{" "}
                      {editingTestimonial
                        ? "(optional — leave unchanged to keep current)"
                        : "(required)"}
                    </p>
                    <div className="flex flex-wrap items-start gap-4">
                      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC]">
                        Choose photo
                        <input
                          type="file"
                          accept="image/*,.svg"
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            setTestimonialProfileFile(file);
                            setTestimonialProfilePreview(
                              file ? URL.createObjectURL(file) : testimonialProfilePreview,
                            );
                          }}
                        />
                      </label>
                      {testimonialProfilePreview ? (
                        <img
                          src={testimonialProfilePreview}
                          alt="Profile preview"
                          className="size-20 rounded-[10px] border border-[#d7e6f3] object-cover"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                {testimonialError ? (
                  <p className="mt-4 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                    {testimonialError}
                  </p>
                ) : null}
                {testimonialSuccess ? (
                  <p className="mt-4 rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a]">
                    {testimonialSuccess}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={testimonialSaving}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {testimonialSaving
                    ? "Saving..."
                    : editingTestimonial
                      ? "Update testimonial"
                      : "Add testimonial"}
                  <ArrowUpRight size={16} />
                </button>
              </form>

              {testimonialsLoadError ? (
                <p className="rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {testimonialsLoadError}
                </p>
              ) : null}
              {testimonialsLoading ? (
                <p className="text-sm text-[#848b9b]">Loading testimonials...</p>
              ) : null}

              <div className="space-y-3">
                {testimonials.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[18px] border border-[#d7e6f3] bg-white p-4 shadow-[0_12px_30px_-22px_rgba(17,61,119,0.35)] sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex min-w-0 flex-1 gap-4">
                        {item.profileUrl ? (
                          <img
                            src={item.profileUrl}
                            alt=""
                            className="size-20 shrink-0 rounded-[12px] object-cover"
                          />
                        ) : null}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="m-0 text-lg font-bold text-[#1F2432]">{item.name}</h3>
                            {item.logoUrl ? (
                              <img
                                src={item.logoUrl}
                                alt=""
                                className="h-6 w-auto max-w-[100px] object-contain"
                              />
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm text-[#848b9b]">{item.title}</p>
                          <p className="mt-1 text-xs text-[#848b9b]">
                            Order {item.sortOrder} · {formatDate(item.createdAt)}
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#687181]">
                            {item.quote}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onEditTestimonial(item)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-2 text-xs font-semibold text-[#2365aa]"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!window.confirm(`Delete testimonial from "${item.name}"?`)) return;
                            try {
                              await deleteTestimonial(item.id);
                              void refreshTestimonials();
                            } catch (err) {
                              setTestimonialError(
                                getErrorMessage(err, "Unable to delete testimonial."),
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
                              className="break-all text-[#2365aa] no-underline hover:underline"
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

      {demoModalOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b1220]/55 p-4 backdrop-blur-[2px] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={editingDemo ? "Update demo" : "Add demo"}
          onClick={closeDemoModal}
        >
          <div
            className="relative max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-[720px] overflow-y-auto rounded-[20px] border border-[#d7e6f3] bg-white p-4 shadow-[0_30px_80px_-28px_rgba(17,61,119,0.45)] sm:p-6 xl:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="m-0 text-xl font-bold text-[#1F2432]">
                  {editingDemo ? "Update demo" : "Add YouTube demo"}
                </h2>
                <p className="mt-1 text-sm text-[#848b9b]">
                  Fill in the details below to {editingDemo ? "update" : "publish"} a demo.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDemoModal}
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#EFF7FC] text-[#2365aa]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitDemo}>
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

              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-[#5a5a5a]">
                  Thumbnail image{" "}
                  <span className="font-normal text-[#848b9b]">
                    (optional — replaces auto-generated YouTube thumbnail)
                  </span>
                </p>
                <div className="flex flex-wrap items-start gap-4">
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="max-w-full truncate">
                      {demoThumbnailFile ? demoThumbnailFile.name : "Choose image"}
                    </span>
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
                        onClick={() => {
                          setDemoThumbnailFile(null);
                          setDemoThumbnailPreview(null);
                        }}
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
                    onClick={() => {
                      closeDemoModal();
                      setTab("tags");
                    }}
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

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTagDropdownOpen((prev) => !prev)}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 text-left text-sm outline-none hover:border-[#2365aa]"
                  >
                    <span
                      className={
                        demoForm.industries.length > 0 ? "text-[#1F2432]" : "text-[#848b9b]"
                      }
                    >
                      {demoForm.industries.length > 0
                        ? `${demoForm.industries.length} tag${demoForm.industries.length === 1 ? "" : "s"} selected`
                        : "Select industry tags"}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-[#848b9b] transition-transform ${tagDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {tagDropdownOpen ? (
                    <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-[12px] border border-[#d7e6f3] bg-white shadow-[0_18px_40px_-24px_rgba(17,61,119,0.45)]">
                      <div className="max-h-52 overflow-y-auto p-2">
                        {demoTags.length === 0 ? (
                          <p className="px-3 py-2 text-sm text-[#848b9b]">No tags available.</p>
                        ) : (
                          demoTags.map((industry) => {
                            const active = demoForm.industries.includes(industry);
                            return (
                              <button
                                key={industry}
                                type="button"
                                onClick={() => toggleIndustry(industry)}
                                className={`mb-1 flex w-full cursor-pointer items-center justify-between gap-3 rounded-[10px] border-0 px-3 py-2.5 text-left text-sm last:mb-0 ${
                                  active
                                    ? "bg-[#EFF7FC] font-semibold text-[#2365aa]"
                                    : "bg-transparent text-[#5a5a5a] hover:bg-[#f8fbfd]"
                                }`}
                              >
                                <span>{industry}</span>
                                {active ? <Check size={16} /> : null}
                              </button>
                            );
                          })
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 border-t border-[#e2ebf3] bg-[#f8fbfd] px-3 py-2.5">
                        <p className="m-0 text-xs text-[#848b9b]">
                          {demoForm.industries.length > 0
                            ? `${demoForm.industries.length} selected`
                            : "Select one or more tags"}
                        </p>
                        <button
                          type="button"
                          onClick={() => setTagDropdownOpen(false)}
                          className="cursor-pointer rounded-full border-0 bg-[#2365aa] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1a5490]"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                {demoForm.industries.length > 0 ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {demoForm.industries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => toggleIndustry(industry)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-2.5 py-1 text-[11px] font-semibold text-[#2365aa]"
                      >
                        {industry}
                        <X size={12} />
                      </button>
                    ))}
                  </div>
                ) : null}
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
                  Public demos appear on the website. Private demos are only visible in this admin
                  panel.
                </p>
              </div>

              {demoError ? (
                <p className="mt-4 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {demoError}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={demoSaving}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {demoSaving
                    ? "Saving..."
                    : editingDemo
                      ? "Update demo"
                      : "Add demo"}
                  <ArrowUpRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={closeDemoModal}
                  className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-5 py-3 text-sm font-semibold text-[#2365aa]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

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
