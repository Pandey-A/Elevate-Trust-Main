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
  UploadCloud,
  Video,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { type AdminDemo, type AdminJob, type IndustryTag } from "../../data/adminDefaults";
import { useAdminAuth, useAdminBlogs, useAdminDemos, useAdminJobs, useAdminDemoTags, useAdminTestimonials, useDemoTags } from "../../hooks/useAdminData";
import {
  createId,
  extractYoutubeId,
} from "../../lib/adminStorage";
import { getErrorMessage } from "../../lib/api";
import { canManageAdminContent, getAuthSession, logoutUser } from "../../lib/auth";
import {
  createJob,
  deleteJob,
  updateJob,
} from "../../lib/jobsApi";
import { useToast } from "../../components/ui/ToastProvider";
import {
  createDemo,
  DEMO_VIDEO_MAX_BYTES,
  deleteDemo,
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
import CircularImageCropper from "../../components/admin/CircularImageCropper";
import DemoPlayCover from "../../components/DemoPlayCover";
import DemoVideoPlayer from "../../components/DemoVideoPlayer";
import { excerptFromContent, isRichTextEmpty } from "../../lib/blogContent";
import elevateLogo from "../../assets/nav/elevate-logo.svg";
import {
  createDocumentCoverFile,
  DEMO_MEDIA_ACCEPT,
  getDemoDocumentKind,
  getDemoDocumentKindFromFile,
  isDemoDocumentDemo,
} from "../../lib/demoMedia";

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
  const isSuperAdmin = canManageAdminContent(session?.role);
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
  const {
    jobs,
    loading: jobsLoading,
    error: jobsLoadError,
    refresh: refreshJobs,
  } = useAdminJobs();
  const { showToast } = useToast();

  const [tab, setTab] = useState<Tab>(() =>
    canManageAdminContent(getAuthSession()?.role) ? "overview" : "demos",
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [homeDemoSearch, setHomeDemoSearch] = useState("");
  const [homeTagFilter, setHomeTagFilter] = useState("All");
  const [homeTagMenuOpen, setHomeTagMenuOpen] = useState(false);
  const [homeTagMenuPos, setHomeTagMenuPos] = useState({ top: 0, right: 0 });
  const homeTagMenuRef = useRef<HTMLDivElement>(null);
  const homeTagButtonRef = useRef<HTMLButtonElement>(null);
  const [demoForm, setDemoForm] = useState(emptyDemoForm);
  const [demoThumbnailFile, setDemoThumbnailFile] = useState<File | null>(null);
  const [demoThumbnailPreview, setDemoThumbnailPreview] = useState<string | null>(null);
  const [demoVideoFile, setDemoVideoFile] = useState<File | null>(null);
  const [demoVideoPreview, setDemoVideoPreview] = useState<string | null>(null);
  const [demoExistingVideoUrl, setDemoExistingVideoUrl] = useState<string | null>(null);
  const autoDocCoverRef = useRef(false);
  const [demoVideoDragOver, setDemoVideoDragOver] = useState(false);
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonialForm);
  const [testimonialLogoFile, setTestimonialLogoFile] = useState<File | null>(null);
  const [testimonialLogoPreview, setTestimonialLogoPreview] = useState<string | null>(null);
  const [testimonialProfileFile, setTestimonialProfileFile] = useState<File | null>(null);
  const [testimonialProfilePreview, setTestimonialProfilePreview] = useState<string | null>(null);
  const [profileCropSrc, setProfileCropSrc] = useState<string | null>(null);
  const [profileCropName, setProfileCropName] = useState("profile.jpg");
  const profileFileInputRef = useRef<HTMLInputElement>(null);
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
  const [demoUploadProgress, setDemoUploadProgress] = useState<number | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSearch, setDemoSearch] = useState("");
  const [demoCategoryFilter, setDemoCategoryFilter] = useState("All");
  const [demoCategoryMenuOpen, setDemoCategoryMenuOpen] = useState(false);
  const demoCategoryMenuRef = useRef<HTMLDivElement>(null);
  const demoCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [testimonialSaving, setTestimonialSaving] = useState(false);
  const [tagName, setTagName] = useState("");
  const [editingTagId, setEditingTagId] = useState("");
  const [tagError, setTagError] = useState("");
  const [tagSuccess, setTagSuccess] = useState("");
  const [tagSaving, setTagSaving] = useState(false);
  const [playingDemo, setPlayingDemo] = useState<AdminDemo | null>(null);
  const [playingDemoExpanded, setPlayingDemoExpanded] = useState(false);
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
    if (!homeTagMenuOpen) return;

    const closeMenu = () => setHomeTagMenuOpen(false);

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        homeTagMenuRef.current?.contains(target) ||
        homeTagButtonRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    // Close only when page scrolls — not when interacting with the dropdown itself
    const onScroll = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Node &&
        homeTagMenuRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", closeMenu);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", closeMenu);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [homeTagMenuOpen]);

  useEffect(() => {
    if (!demoCategoryMenuOpen) return;

    const closeMenu = () => setDemoCategoryMenuOpen(false);
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        demoCategoryMenuRef.current?.contains(target) ||
        demoCategoryButtonRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const onScroll = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Node &&
        demoCategoryMenuRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", closeMenu);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", closeMenu);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [demoCategoryMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!session) return;
    if (!isSuperAdmin && tab !== "demos") {
      setTab("demos");
    }
  }, [session, isSuperAdmin, tab]);

  useEffect(() => {
    if (!session || !isSuperAdmin) return;
    void loadApplications();
  }, [session, isSuperAdmin, loadApplications]);

  useEffect(() => {
    if (!playingDemo && !demoModalOpen) return;

    setPlayingDemoExpanded(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPlayingDemoExpanded(false);
      setPlayingDemo(null);
      if (demoModalOpen) {
        setDemoModalOpen(false);
        setTagDropdownOpen(false);
        setDemoForm(emptyDemoForm);
        setDemoThumbnailFile(null);
        setDemoThumbnailPreview(null);
        setDemoVideoFile(null);
        setDemoVideoPreview(null);
        setDemoExistingVideoUrl(null);
        setDemoVideoDragOver(false);
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
    setProfileCropSrc(null);
    setProfileCropName("profile.jpg");
    if (profileFileInputRef.current) profileFileInputRef.current.value = "";
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

  const homeFilterTags = useMemo(() => {
    return [...demoTags].sort((a, b) => a.localeCompare(b));
  }, [demoTags]);

  const homeFilteredDemos = useMemo(() => {
    const query = homeDemoSearch.trim().toLowerCase();
    return demos.filter((demo) => {
      const matchesSearch = !query || demo.title.toLowerCase().includes(query);
      const matchesTag =
        homeTagFilter === "All" ||
        demo.industries.some(
          (industry) => industry.toLowerCase() === homeTagFilter.trim().toLowerCase(),
        );
      return matchesSearch && matchesTag;
    });
  }, [demos, homeDemoSearch, homeTagFilter]);

  const homeFilterActive =
    homeDemoSearch.trim().length > 0 || homeTagFilter !== "All";

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onDeleteApplication = async (application: CareerApplication) => {
    try {
      setDeletingApplicationId(application.id);
      setApplicationsError("");
      await deleteCareerApplication(application.id);
      setApplications((prev) => prev.filter((item) => item.id !== application.id));
      showToast("Application removed successfully.", "success");
    } catch (err) {
      const message = getErrorMessage(err, "Unable to delete application.");
      setApplicationsError(message);
      showToast(message, "error");
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
    setDemoVideoFile(null);
    if (demoVideoPreview) URL.revokeObjectURL(demoVideoPreview);
    setDemoVideoPreview(null);
    setDemoExistingVideoUrl(null);
    autoDocCoverRef.current = false;
    setDemoVideoDragOver(false);
    setDemoUploadProgress(null);
    setDemoError("");
    setDemoSuccess("");
    setTagDropdownOpen(false);
  };

  const closeDemoModal = () => {
    setDemoModalOpen(false);
    resetDemoForm();
  };

  const openAddDemoModal = () => {
    if (!isSuperAdmin) return;
    resetDemoForm();
    setDemoModalOpen(true);
  };

  const resetJobForm = () => {
    setJobForm(emptyJobForm);
    setJobError("");
    setJobSuccess("");
  };

  const onEditDemo = (demo: AdminDemo) => {
    if (!isSuperAdmin) return;
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
    setDemoVideoFile(null);
    if (demoVideoPreview) URL.revokeObjectURL(demoVideoPreview);
    setDemoVideoPreview(null);
    setDemoExistingVideoUrl(demo.videoUrl ?? null);
    autoDocCoverRef.current = false;
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

  const assignDemoVideoFile = async (file: File | null) => {
    if (demoVideoPreview) URL.revokeObjectURL(demoVideoPreview);
    if (!file) {
      setDemoVideoFile(null);
      setDemoVideoPreview(null);
      if (autoDocCoverRef.current) {
        setDemoThumbnailFile(null);
        setDemoThumbnailPreview(null);
        autoDocCoverRef.current = false;
      }
      return;
    }

    const documentKind = getDemoDocumentKindFromFile(file);
    const isVideo =
      file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
    if (!documentKind && !isVideo) {
      setDemoError("Please upload a video (MP4, WEBM, MOV) or document (PPTX, PDF, DOCX).");
      return;
    }
    if (file.size > DEMO_VIDEO_MAX_BYTES) {
      setDemoError("File must be 500MB or smaller.");
      return;
    }

    setDemoError("");
    setDemoVideoFile(file);
    setDemoVideoPreview(documentKind ? null : URL.createObjectURL(file));

    if (documentKind) {
      setDemoForm((prev) => ({ ...prev, industries: [], youtubeUrl: "" }));
      try {
        const cover = await createDocumentCoverFile(documentKind);
        setDemoThumbnailFile(cover);
        setDemoThumbnailPreview(URL.createObjectURL(cover));
        autoDocCoverRef.current = true;
      } catch {
        autoDocCoverRef.current = false;
      }
      return;
    }

    if (autoDocCoverRef.current) {
      setDemoThumbnailFile(null);
      setDemoThumbnailPreview(null);
      autoDocCoverRef.current = false;
    }
  };

  const selectedDocumentKind =
    getDemoDocumentKindFromFile(demoVideoFile) ||
    getDemoDocumentKind(demoExistingVideoUrl || "");
  const isDocumentDemo = Boolean(selectedDocumentKind);

  const demoUploadKindLabel = (() => {
    const kind = getDemoDocumentKindFromFile(demoVideoFile);
    if (kind) return kind;
    if (demoVideoFile) return "video";
    if (demoThumbnailFile) return "thumbnail";
    return "file";
  })();
  const demoUploadStatusText = `Uploading ${demoUploadKindLabel}…`;
  const demoUploadButtonText =
    demoUploadProgress !== null
      ? `Uploading ${demoUploadKindLabel} ${demoUploadProgress}%`
      : "Saving...";

  const submitDemo = async (event: FormEvent) => {
    event.preventDefault();
    setDemoError("");
    setDemoSuccess("");

    const videoId = extractYoutubeId(demoForm.youtubeUrl);
    if (!demoForm.title.trim()) {
      setDemoError("Demo title is required.");
      return;
    }
    if (!demoVideoFile && !demoExistingVideoUrl && !videoId) {
      setDemoError("Upload a demo video or document, or paste a YouTube URL (temporary).");
      return;
    }
    if (!isDocumentDemo && demoForm.industries.length === 0) {
      setDemoError("Select at least one industry tag.");
      return;
    }

    const payload = {
      title: demoForm.title.trim(),
      youtubeUrl: isDocumentDemo ? "" : demoForm.youtubeUrl.trim(),
      industries: isDocumentDemo ? [] : demoForm.industries,
      isPublic: demoForm.isPublic,
      thumbnailFile: demoThumbnailFile,
      videoFile: demoVideoFile,
    };

    try {
      setDemoSaving(true);
      setDemoUploadProgress(demoVideoFile || demoThumbnailFile ? 0 : null);
      const uploadOpts = {
        onUploadProgress: (percent: number) => setDemoUploadProgress(percent),
      };
      if (editingDemo) {
        await updateDemo(demoForm.id, payload, uploadOpts);
      } else {
        await createDemo({ id: createId("demo"), ...payload }, uploadOpts);
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
      setDemoUploadProgress(null);
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

  const submitJob = async (event: FormEvent) => {
    event.preventDefault();
    setJobError("");
    setJobSuccess("");

    if (!jobForm.title.trim() || !jobForm.description.trim() || !jobForm.category.trim()) {
      setJobError("Title, description, and category are required.");
      return;
    }

    const payload = {
      title: jobForm.title.trim(),
      tag: jobForm.tag.trim() || jobForm.category.trim(),
      description: jobForm.description.trim(),
      type: jobForm.type.trim() || "Full-time",
      location: jobForm.location.trim() || "Remotely",
      category: jobForm.category.trim(),
      categorySubtitle:
        jobForm.categorySubtitle.trim() ||
        `Open position in our ${jobForm.category.trim().toLowerCase()} team.`,
    };

    try {
      if (editingJob && jobForm.id) {
        await updateJob(jobForm.id, payload);
        showToast("Job updated successfully.", "success");
        setJobSuccess("Job updated successfully.");
      } else {
        await createJob({
          id: jobForm.id || createId("job"),
          ...payload,
        });
        showToast("Job posting added successfully.", "success");
        setJobSuccess("Job posting added successfully.");
      }
      void refreshJobs();
      resetJobForm();
    } catch (err) {
      const message = getErrorMessage(
        err,
        editingJob ? "Unable to update job." : "Unable to add job.",
      );
      setJobError(message);
      showToast(message, "error");
    }
  };

  const onLogout = () => {
    logoutUser();
    navigate("/admin");
  };

  const selectTab = (next: Tab) => {
    setTab(next);
    setHomeTagMenuOpen(false);
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
            ? "px-3.5 pl-[68px] sm:px-6 sm:pl-[76px] lg:px-8 lg:pl-[88px] xl:px-10 xl:pl-[92px] 2xl:pl-[96px]"
            : "px-3.5 pl-[68px] sm:px-6 sm:pl-[76px] lg:px-8 lg:pl-[240px] xl:px-10 xl:pl-[280px] 2xl:pl-[300px]"
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
            )
              .filter(([id]) => isSuperAdmin || id === "demos")
              .map(([id, label, Icon]) => (
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
                  {isSuperAdmin ? label : "Demos"}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0 overflow-x-hidden">
          {tab === "overview" && isSuperAdmin ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <div className="flex flex-col gap-3 rounded-[18px] border border-[#d7e6f3] bg-white p-3 sm:p-3.5 xl:flex-row xl:items-center xl:gap-4">
                <h2 className="m-0 shrink-0 px-1 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                  Demos
                </h2>

                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="relative min-w-0 flex-1">
                    <Search
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a94a6]"
                    />
                    <input
                      value={homeDemoSearch}
                      onChange={(event) => setHomeDemoSearch(event.target.value)}
                      className="h-10 w-full rounded-full border border-[#e2e8f0] bg-[#f7fafc] pl-9 pr-3 text-sm text-[#1F2432] outline-none transition placeholder:text-[#9aa3b2] focus:border-[#2365aa] focus:bg-white focus:ring-2 focus:ring-[#2365aa]/10"
                      placeholder="Search demos…"
                      aria-label="Search demos by title"
                    />
                  </label>

                  <div className="relative w-full shrink-0 sm:w-[220px]">
                    <button
                      ref={homeTagButtonRef}
                      type="button"
                      onClick={() => {
                        const button = homeTagButtonRef.current;
                        if (button) {
                          const rect = button.getBoundingClientRect();
                          setHomeTagMenuPos({
                            top: rect.bottom + 6,
                            right: Math.max(12, window.innerWidth - rect.right),
                          });
                        }
                        setHomeTagMenuOpen((open) => !open);
                      }}
                      className={`inline-flex h-10 w-full cursor-pointer items-center justify-between gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition ${
                        homeTagFilter === "All"
                          ? "border-[#e2e8f0] bg-[#f7fafc] text-[#1F2432] hover:border-[#2365aa]/40 hover:bg-white"
                          : "border-[#2365aa] bg-[#2365aa] text-white hover:bg-[#1a5490]"
                      }`}
                      aria-haspopup="listbox"
                      aria-expanded={homeTagMenuOpen}
                    >
                      <span className="flex min-w-0 items-center gap-1.5">
                        <ListFilter size={14} className="shrink-0" />
                        <span className="truncate">
                          {homeTagFilter === "All" ? "All tags" : homeTagFilter}
                        </span>
                      </span>
                      <ChevronDown
                        size={14}
                        className={`shrink-0 transition-transform ${
                          homeTagMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {homeTagMenuOpen
                      ? createPortal(
                          <div
                            ref={homeTagMenuRef}
                            role="listbox"
                            style={{
                              top: homeTagMenuPos.top,
                              right: homeTagMenuPos.right,
                            }}
                            className="fixed z-[250] w-[min(280px,calc(100vw-24px))] rounded-[16px] border border-gray-100 bg-white px-3 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                          >
                            <button
                              type="button"
                              role="option"
                              aria-selected={homeTagFilter === "All"}
                              onClick={() => {
                                setHomeTagFilter("All");
                                setHomeTagMenuOpen(false);
                              }}
                              className={`mb-0.5 flex w-full cursor-pointer items-center justify-between rounded-md border-0 px-2.5 py-1.5 text-left text-sm font-medium leading-snug transition-all duration-200 hover:scale-[1.02] hover:bg-[#EFF7FC] hover:text-[#111827] origin-left ${
                                homeTagFilter === "All"
                                  ? "bg-[#EFF7FC] text-[#111827]"
                                  : "bg-transparent text-[#4B5563]"
                              }`}
                            >
                              All tags
                              {homeTagFilter === "All" ? (
                                <Check size={15} className="shrink-0 text-[#2365aa]" />
                              ) : null}
                            </button>
                            <div className="scrollbar-none flex max-h-[min(480px,65vh)] flex-col gap-0 overflow-y-auto overflow-x-hidden">
                              {homeFilterTags.map((tag) => {
                                const active =
                                  homeTagFilter.trim().toLowerCase() ===
                                  tag.toLowerCase();
                                return (
                                  <button
                                    key={tag}
                                    type="button"
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => {
                                      setHomeTagFilter(tag);
                                      setHomeTagMenuOpen(false);
                                    }}
                                    className={`flex w-full cursor-pointer items-start justify-between gap-2 rounded-md border-0 px-2.5 py-1.5 text-left text-sm font-medium leading-snug transition-all duration-200 hover:scale-[1.02] hover:bg-[#EFF7FC] hover:text-[#111827] origin-left ${
                                      active
                                        ? "bg-[#EFF7FC] text-[#111827]"
                                        : "bg-transparent text-[#4B5563]"
                                    }`}
                                  >
                                    <span className="whitespace-normal break-words">
                                      {tag}
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
                        setHomeTagFilter("All");
                        setHomeTagMenuOpen(false);
                      }}
                      className="inline-flex h-10 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-white px-4 text-sm font-semibold text-[#5b6b82] transition hover:border-[#2365aa]/35 hover:text-[#2365aa] sm:w-auto"
                      aria-label="Clear filters"
                    >
                      <X size={15} />
                      Clear
                    </button>
                  ) : null}
                </div>
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
                      No demos match your search or tag filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setHomeDemoSearch("");
                        setHomeTagFilter("All");
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
                        onPlay={() => {
                          setPlayingDemo(demo);
                        }}
                      />
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {tab === "demos" ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <div className="flex flex-col gap-3 rounded-[18px] border border-[#d7e6f3] bg-white p-3 sm:p-3.5 xl:flex-row xl:items-center xl:gap-4">
                <h2 className="m-0 shrink-0 px-1 text-xl font-bold text-[#1F2432] 2xl:text-2xl">
                  {isSuperAdmin ? "Manage Demos" : "Demos"}
                </h2>

                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="relative min-w-0 flex-1">
                    <Search
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a94a6]"
                    />
                    <input
                      value={demoSearch}
                      onChange={(event) => setDemoSearch(event.target.value)}
                      className="h-10 w-full rounded-full border border-[#e2e8f0] bg-[#f7fafc] pl-9 pr-3 text-sm text-[#1F2432] outline-none transition placeholder:text-[#9aa3b2] focus:border-[#2365aa] focus:bg-white focus:ring-2 focus:ring-[#2365aa]/10"
                      placeholder="Search by title..."
                    />
                  </label>

                  <div className="relative w-full shrink-0 sm:w-[240px]">
                    <button
                      ref={demoCategoryButtonRef}
                      type="button"
                      onClick={() => setDemoCategoryMenuOpen((open) => !open)}
                      className="inline-flex h-10 w-full cursor-pointer items-center justify-between gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f7fafc] px-4 text-sm font-medium text-[#1F2432] outline-none transition hover:border-[#2365aa]/40 hover:bg-white focus:border-[#2365aa] focus:bg-white focus:ring-2 focus:ring-[#2365aa]/10"
                      aria-haspopup="listbox"
                      aria-expanded={demoCategoryMenuOpen}
                      aria-label="Filter by category"
                    >
                      <span className="truncate">
                        {demoCategoryFilter === "All"
                          ? "All categories"
                          : demoCategoryFilter}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`shrink-0 text-[#8a94a6] transition-transform ${
                          demoCategoryMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {demoCategoryMenuOpen ? (
                      <div
                        ref={demoCategoryMenuRef}
                        role="listbox"
                        className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(280px,calc(100vw-2rem))] rounded-[16px] border border-gray-100 bg-white px-3 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                      >
                        <button
                          type="button"
                          role="option"
                          aria-selected={demoCategoryFilter === "All"}
                          onClick={() => {
                            setDemoCategoryFilter("All");
                            setDemoCategoryMenuOpen(false);
                          }}
                          className={`mb-0.5 flex w-full cursor-pointer items-center justify-between rounded-md border-0 px-2.5 py-1.5 text-left text-sm font-medium leading-snug transition-all duration-200 hover:scale-[1.02] hover:bg-[#EFF7FC] hover:text-[#111827] origin-left ${
                            demoCategoryFilter === "All"
                              ? "bg-[#EFF7FC] text-[#111827]"
                              : "bg-transparent text-[#4B5563]"
                          }`}
                        >
                          All categories
                          {demoCategoryFilter === "All" ? (
                            <Check size={15} className="shrink-0 text-[#2365aa]" />
                          ) : null}
                        </button>
                        <div className="scrollbar-none flex max-h-[min(480px,65vh)] flex-col gap-0 overflow-y-auto overflow-x-hidden">
                          {demoTags.map((tag) => {
                            const active =
                              demoCategoryFilter.trim().toLowerCase() ===
                              tag.toLowerCase();
                            return (
                              <button
                                key={tag}
                                type="button"
                                role="option"
                                aria-selected={active}
                                onClick={() => {
                                  setDemoCategoryFilter(tag);
                                  setDemoCategoryMenuOpen(false);
                                }}
                                className={`flex w-full cursor-pointer items-start justify-between gap-2 rounded-md border-0 px-2.5 py-1.5 text-left text-sm font-medium leading-snug transition-all duration-200 hover:scale-[1.02] hover:bg-[#EFF7FC] hover:text-[#111827] origin-left ${
                                  active
                                    ? "bg-[#EFF7FC] text-[#111827]"
                                    : "bg-transparent text-[#4B5563]"
                                }`}
                              >
                                <span className="whitespace-normal break-words">
                                  {tag}
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
                      </div>
                    ) : null}
                  </div>

                  {isSuperAdmin ? (
                    <button
                      type="button"
                      onClick={openAddDemoModal}
                      className="inline-flex h-10 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] px-4 text-sm font-semibold text-white transition hover:bg-[#1a5490] sm:w-auto"
                    >
                      <Plus size={16} />
                      Add Demo
                    </button>
                  ) : null}
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
                      ? isSuperAdmin
                        ? "No demos yet. Click Add Demo to create one."
                        : "No demos available yet."
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
                        onPlay={() => {
                          setPlayingDemo(demo);
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="m-0 min-h-[3rem] text-base font-bold leading-snug text-[#1F2432]">
                        {demo.title}
                      </h3>
                      <div className="mt-2 flex min-h-[3.25rem] flex-wrap content-start gap-1.5">
                        {demo.industries.length > 0 ? (
                          demo.industries.map((industry) => (
                            <span
                              key={industry}
                              className="rounded-full bg-[#EFF7FC] px-2.5 py-1 text-[11px] font-semibold text-[#2365aa]"
                            >
                              {industry}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full bg-[#fff1f1] px-2.5 py-1 text-[11px] font-semibold text-[#DC2626]">
                            {isDemoDocumentDemo(demo) ? "Document · no tags" : "No tags"}
                          </span>
                        )}
                      </div>
                      <div className="mt-auto flex flex-col gap-2 pt-4 md:flex-row md:flex-wrap">
                        {isSuperAdmin ? (
                          <>
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
                          </>
                        ) : (
                          <p className="m-0 text-xs font-medium text-[#848b9b]">
                            View only — play demos from the cover above.
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "blogs" && isSuperAdmin ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <form
                onSubmit={submitBlog}
                className="rounded-[20px] border border-[#d7e6f3] bg-white p-4 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8"
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
                    Cover image {editingBlog ? "(optional leave unchanged to keep current)" : "(required)"}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC] sm:w-auto">
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
                        className="h-28 w-full rounded-[10px] border border-[#d7e6f3] object-cover sm:h-24 sm:w-40"
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
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:min-w-0 sm:flex-1 sm:gap-4">
                        {blog.imageUrl ? (
                          <img
                            src={blog.imageUrl}
                            alt=""
                            className="h-40 w-full rounded-[12px] object-cover sm:size-20 sm:shrink-0"
                          />
                        ) : null}
                        <div className="min-w-0">
                          <h3 className="m-0 text-base font-bold text-[#1F2432] sm:text-lg">{blog.title}</h3>
                          <p className="mt-1 text-xs text-[#848b9b]">
                            {formatDate(blog.createdAt)}
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#687181]">
                            {excerptFromContent(blog.description)}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center gap-2 border-t border-[#e8eef3] pt-3 sm:w-auto sm:border-t-0 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => onEditBlog(blog)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3.5 py-2 text-xs font-semibold text-[#2365aa] sm:flex-initial"
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
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3.5 py-2 text-xs font-semibold text-[#2365aa] sm:flex-initial"
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

          {tab === "testimonials" && isSuperAdmin ? (
            <section className="space-y-5 sm:space-y-6 2xl:space-y-8">
              <form
                onSubmit={submitTestimonial}
                className="rounded-[20px] border border-[#d7e6f3] bg-white p-4 shadow-[0_14px_40px_-28px_rgba(17,61,119,0.3)] sm:p-6 xl:rounded-[24px] xl:p-7 2xl:p-8"
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

                <label className="mt-4 flex w-full flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] sm:max-w-[220px]">
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
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                      <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC] sm:w-auto">
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
                          className="h-16 w-full max-w-[160px] rounded-[10px] border border-[#d7e6f3] bg-white p-2 object-contain sm:w-28"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-[#5a5a5a]">
                      Profile image{" "}
                      {editingTestimonial
                        ? "(optional leave unchanged to keep current)"
                        : "(required)"}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                      <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-5 py-4 text-sm font-medium text-[#2365aa] transition-colors hover:border-[#2365aa] hover:bg-[#EFF7FC] sm:w-auto">
                        Choose photo
                        <input
                          ref={profileFileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            if (!file) return;
                            if (profileCropSrc) URL.revokeObjectURL(profileCropSrc);
                            setProfileCropName(file.name || "profile.jpg");
                            setProfileCropSrc(URL.createObjectURL(file));
                            event.target.value = "";
                          }}
                        />
                      </label>
                      {testimonialProfilePreview ? (
                        <div className="flex flex-col items-center gap-2 sm:items-start">
                          <img
                            src={testimonialProfilePreview}
                            alt="Profile preview"
                            className="size-20 rounded-full border border-[#d7e6f3] object-cover"
                          />
                          <p className="m-0 text-xs text-[#848b9b]">
                            Circle preview (site view)
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setProfileCropName(
                                testimonialProfileFile?.name || "profile.jpg",
                              );
                              setProfileCropSrc(testimonialProfilePreview);
                            }}
                            className="text-xs font-semibold text-[#2365aa] underline-offset-2 hover:underline"
                          >
                            Adjust crop
                          </button>
                        </div>
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
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {testimonialSaving
                    ? "Saving..."
                    : editingTestimonial
                      ? "Update testimonial"
                      : "Add testimonial"}
                  <ArrowUpRight size={16} />
                </button>
              </form>

              {profileCropSrc ? (
                <CircularImageCropper
                  open
                  imageSrc={profileCropSrc}
                  fileName={profileCropName}
                  onCancel={() => {
                    // Only revoke temp pick URLs, never the active preview.
                    if (
                      profileCropSrc.startsWith("blob:") &&
                      profileCropSrc !== testimonialProfilePreview
                    ) {
                      URL.revokeObjectURL(profileCropSrc);
                    }
                    setProfileCropSrc(null);
                  }}
                  onComplete={(file, previewUrl) => {
                    if (
                      profileCropSrc.startsWith("blob:") &&
                      profileCropSrc !== testimonialProfilePreview
                    ) {
                      URL.revokeObjectURL(profileCropSrc);
                    }
                    if (
                      testimonialProfilePreview &&
                      testimonialProfilePreview.startsWith("blob:")
                    ) {
                      URL.revokeObjectURL(testimonialProfilePreview);
                    }
                    setTestimonialProfileFile(file);
                    setTestimonialProfilePreview(previewUrl);
                    setProfileCropSrc(null);
                  }}
                />
              ) : null}

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
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:min-w-0 sm:flex-1 sm:gap-4">
                        {item.profileUrl ? (
                          <img
                            src={item.profileUrl}
                            alt=""
                            className="size-16 rounded-[12px] object-cover sm:size-20 sm:shrink-0"
                          />
                        ) : null}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="m-0 text-base font-bold text-[#1F2432] sm:text-lg">{item.name}</h3>
                            {item.logoUrl ? (
                              <img
                                src={item.logoUrl}
                                alt=""
                                className="h-6 w-auto max-w-[100px] object-contain"
                              />
                            ) : null}
                          </div>
                          <p className="mt-1 text-xs text-[#848b9b] sm:text-sm">{item.title}</p>
                          <p className="mt-1 text-xs text-[#848b9b]">
                            Order {item.sortOrder} · {formatDate(item.createdAt)}
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#687181]">
                            {item.quote}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center gap-2 border-t border-[#e8eef3] pt-3 sm:w-auto sm:border-t-0 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => onEditTestimonial(item)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3.5 py-2 text-xs font-semibold text-[#2365aa] sm:flex-initial"
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
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border-0 bg-[#EEF3FB] px-3.5 py-2 text-xs font-semibold text-[#2365aa] sm:flex-initial"
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

          {tab === "tags" && isSuperAdmin ? (
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

          {tab === "jobs" && isSuperAdmin ? (
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
                {jobsLoadError ? (
                  <p className="mt-4 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                    {jobsLoadError}
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
                {jobsLoading ? (
                  <p className="m-0 text-sm text-[#848b9b]">Loading jobs…</p>
                ) : null}
                {!jobsLoading && jobs.length === 0 ? (
                  <p className="m-0 text-sm text-[#848b9b]">No job postings yet.</p>
                ) : null}
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
                          onClick={async () => {
                            if (!window.confirm(`Delete "${job.title}"?`)) return;
                            try {
                              await deleteJob(job.id);
                              void refreshJobs();
                              showToast("Job deleted successfully.", "success");
                            } catch (err) {
                              const message = getErrorMessage(
                                err,
                                "Unable to delete job.",
                              );
                              setJobError(message);
                              showToast(message, "error");
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

          {tab === "applications" && isSuperAdmin ? (
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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b1220]/55 p-3 backdrop-blur-[2px] sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={editingDemo ? "Update demo" : "Add demo"}
          onClick={closeDemoModal}
        >
          <div
            className="relative flex w-full max-w-[1100px] flex-col overflow-visible rounded-[24px] border border-[#d7e6f3] bg-white shadow-[0_30px_80px_-28px_rgba(17,61,119,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#eef3f8] px-6 py-4 sm:px-8 sm:py-5">
              <div className="min-w-0">
                <h2 className="m-0 text-2xl font-bold tracking-tight text-[#1F2432]">
                  {editingDemo ? "Update demo" : "Add demo"}
                </h2>
                <p className="mt-1.5 text-sm text-[#848b9b]">
                  Upload a video or document (PPTX, PDF, DOCX), or use YouTube as a temporary option.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDemoModal}
                className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#EFF7FC] text-[#2365aa] transition hover:bg-[#e3eef8]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitDemo} className="flex flex-col">
              <div className="grid grid-cols-1 gap-6 px-6 py-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0 sm:px-8 sm:py-6">
                <div className="space-y-5">
                <section className="space-y-2.5">
                  <label className="block text-sm font-semibold text-[#1F2432]">
                    Demo title
                  </label>
                  <input
                    value={demoForm.title}
                    onChange={(event) =>
                      setDemoForm((prev) => ({ ...prev, title: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-[#d7e6f3] bg-[#f8fbfd] px-4 py-3 text-sm text-[#1F2432] outline-none transition placeholder:text-[#9aa3b2] focus:border-[#2365aa] focus:bg-white focus:ring-4 focus:ring-[#2365aa]/10"
                    placeholder="e.g. Crowd Detection"
                  />
                </section>

                <section className="space-y-2.5 rounded-2xl border border-[#d7e6f3] bg-[#f7fafc] p-4">
                  <div>
                    <p className="m-0 text-sm font-semibold text-[#1F2432]">Demo file</p>
                    <p className="mt-1 text-xs text-[#687181]">
                      Video plays on the website. Documents open in a new tab and stay without industry tags.
                    </p>
                  </div>
                  {(demoVideoFile || demoVideoPreview) ? (
                    <div className="flex items-stretch gap-3 rounded-2xl border border-[#d7e6f3] bg-white p-3">
                      <div className="relative h-[88px] w-[148px] shrink-0 overflow-hidden rounded-xl bg-black">
                        {selectedDocumentKind ? (
                          <div className="flex h-full w-full items-center justify-center bg-[#DC2626] text-2xl font-bold text-white">
                            {selectedDocumentKind}
                          </div>
                        ) : demoVideoPreview ? (
                          <video
                            src={demoVideoPreview}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/70">
                            Video
                          </div>
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
                        <div className="min-w-0">
                          <p className="m-0 truncate text-sm font-semibold text-[#1F2432]">
                            {demoVideoFile?.name || "Selected file"}
                          </p>
                          <p className="mt-0.5 text-xs text-[#687181]">
                            {demoVideoFile
                              ? `${(demoVideoFile.size / (1024 * 1024)).toFixed(1)} MB · ready to upload`
                              : "Ready to upload · click Change to replace"}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <label className="inline-flex cursor-pointer items-center rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa] transition hover:bg-[#e7f1fa]">
                            Change
                            <input
                              type="file"
                              accept={DEMO_MEDIA_ACCEPT}
                              className="sr-only"
                              onChange={(event) => {
                                const file = event.target.files?.[0] ?? null;
                                void assignDemoVideoFile(file);
                                event.target.value = "";
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => void assignDemoVideoFile(null)}
                            className="inline-flex cursor-pointer items-center rounded-full border border-[#d7e6f3] bg-white px-3 py-1.5 text-xs font-semibold text-[#5b6b82] transition hover:border-[#2365aa]/30 hover:text-[#2365aa]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : demoExistingVideoUrl ? (
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#d7e6f3] bg-white px-4 py-3">
                      <div className="min-w-0">
                        <p className="m-0 truncate text-sm font-semibold text-[#1F2432]">
                          {selectedDocumentKind
                            ? `Current uploaded ${selectedDocumentKind}`
                            : "Current uploaded video"}
                        </p>
                        <p className="mt-0.5 text-xs text-[#687181]">
                          Kept unless you upload a new file
                        </p>
                      </div>
                      <label className="inline-flex shrink-0 cursor-pointer items-center rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa] transition hover:bg-[#e7f1fa]">
                        Replace
                        <input
                          type="file"
                          accept={DEMO_MEDIA_ACCEPT}
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            void assignDemoVideoFile(file);
                            event.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <label
                      onDragEnter={(event) => {
                        event.preventDefault();
                        setDemoVideoDragOver(true);
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setDemoVideoDragOver(true);
                      }}
                      onDragLeave={(event) => {
                        event.preventDefault();
                        setDemoVideoDragOver(false);
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        setDemoVideoDragOver(false);
                        const file = event.dataTransfer.files?.[0] ?? null;
                        void assignDemoVideoFile(file);
                      }}
                      className={`flex min-h-[112px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-5 py-5 text-center transition ${
                        demoVideoDragOver
                          ? "border-[#2365aa] bg-white"
                          : "border-[#cfe0ef] bg-white hover:border-[#2365aa]/55"
                      }`}
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#EFF7FC] text-[#2365aa]">
                        <UploadCloud size={20} />
                      </span>
                      <span className="text-sm font-semibold text-[#1F2432]">
                        Drag & drop video or document here
                      </span>
                      <span className="text-xs text-[#687181]">
                        or browse · MP4 / WEBM / MOV / PPTX / PDF / DOCX · up to 500MB
                      </span>
                      <input
                        type="file"
                        accept={DEMO_MEDIA_ACCEPT}
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          void assignDemoVideoFile(file);
                          event.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </section>

                {!isDocumentDemo ? (
                <section className="space-y-2.5">
                  <div>
                    <p className="m-0 text-sm font-semibold text-[#1F2432]">
                      YouTube URL
                      <span className="ml-2 text-xs font-normal text-[#848b9b]">
                        Temporary fallback
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[#687181]">
                      Use only if you are not uploading a video file right now.
                    </p>
                  </div>
                  <input
                    value={demoForm.youtubeUrl}
                    onChange={(event) =>
                      setDemoForm((prev) => ({ ...prev, youtubeUrl: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-[#d7e6f3] bg-[#f8fbfd] px-4 py-3 text-sm text-[#1F2432] outline-none transition placeholder:text-[#9aa3b2] focus:border-[#2365aa] focus:bg-white focus:ring-4 focus:ring-[#2365aa]/10"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </section>
                ) : null}
                </div>

                <div className="space-y-5">
                <section className="space-y-2.5">
                    <div>
                      <p className="m-0 text-sm font-semibold text-[#1F2432]">Thumbnail</p>
                      <p className="mt-1 text-xs text-[#687181]">Optional cover image</p>
                    </div>
                    <div className="flex flex-wrap items-start gap-3">
                      <label className="flex min-h-[100px] min-w-[140px] flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#d7e6f3] bg-[#f8fbfd] px-4 py-4 text-sm font-medium text-[#2365aa] transition hover:border-[#2365aa] hover:bg-[#EFF7FC]">
                        <UploadCloud size={20} />
                        <span className="max-w-full truncate px-1 text-xs">
                          {demoThumbnailFile ? demoThumbnailFile.name : "Choose image"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            autoDocCoverRef.current = false;
                            setDemoThumbnailFile(file);
                            setDemoThumbnailPreview(file ? URL.createObjectURL(file) : null);
                          }}
                        />
                      </label>
                      {demoThumbnailPreview ? (
                        <div className="relative shrink-0">
                          <img
                            src={demoThumbnailPreview}
                            alt="Thumbnail preview"
                            className="h-[100px] w-[140px] rounded-2xl border border-[#d7e6f3] object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              autoDocCoverRef.current = false;
                              setDemoThumbnailFile(null);
                              setDemoThumbnailPreview(null);
                            }}
                            className="absolute -right-2 -top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-[#2365aa] text-[11px] font-bold text-white"
                            aria-label="Remove thumbnail"
                          >
                            ✕
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </section>

                {isDocumentDemo ? (
                  <section className="space-y-2.5 rounded-2xl border border-[#d7e6f3] bg-[#fff7f7] p-4">
                    <p className="m-0 text-sm font-semibold text-[#1F2432]">Industry tags</p>
                    <p className="m-0 text-xs leading-5 text-[#687181]">
                      Document demos stay without tags and only appear under All on the website.
                    </p>
                  </section>
                ) : (
                <section className="space-y-2.5">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="m-0 text-sm font-semibold text-[#1F2432]">Industry tags</p>
                      <p className="mt-1 text-xs text-[#687181]">Select one or more categories</p>
                    </div>
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
                    <p className="m-0 text-xs text-[#848b9b]">Loading tags...</p>
                  ) : null}
                  {tagsLoadError ? (
                    <p className="m-0 text-xs text-[#2365aa]">{tagsLoadError}</p>
                  ) : null}

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setTagDropdownOpen((prev) => !prev)}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#d7e6f3] bg-[#f8fbfd] px-4 py-3.5 text-left text-sm outline-none transition hover:border-[#2365aa] focus:border-[#2365aa] focus:bg-white"
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
                        <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#d7e6f3] bg-white shadow-[0_18px_40px_-24px_rgba(17,61,119,0.45)]">
                          <div className="max-h-40 overflow-y-auto p-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                                  className={`mb-1 flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-0 px-3 py-2.5 text-left text-sm last:mb-0 ${
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
                    <div className="flex flex-wrap gap-2 pt-1">
                      {demoForm.industries.map((industry) => (
                        <button
                          key={industry}
                          type="button"
                          onClick={() => toggleIndustry(industry)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-3 py-1.5 text-xs font-semibold text-[#2365aa]"
                        >
                          {industry}
                          <X size={12} />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </section>
                )}

                <section className="space-y-2.5">
                    <div>
                      <p className="m-0 text-sm font-semibold text-[#1F2432]">Visibility</p>
                      <p className="mt-1 text-xs text-[#687181]">
                        Public shows on the website.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setDemoForm((prev) => ({ ...prev, isPublic: true }))}
                        className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                          demoForm.isPublic
                            ? "border-[#113d77] bg-[#113d77] text-white"
                            : "border-[#d7e6f3] bg-[#EFF7FC] text-[#2365aa] hover:bg-[#e7f1fa]"
                        }`}
                      >
                        Public
                      </button>
                      <button
                        type="button"
                        onClick={() => setDemoForm((prev) => ({ ...prev, isPublic: false }))}
                        className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                          !demoForm.isPublic
                            ? "border-[#113d77] bg-[#113d77] text-white"
                            : "border-[#d7e6f3] bg-[#EFF7FC] text-[#2365aa] hover:bg-[#e7f1fa]"
                        }`}
                      >
                        Private
                      </button>
                    </div>
                  </section>

                {demoError ? (
                  <p className="rounded-2xl bg-[#EEF3FB] px-4 py-3 text-sm text-[#2365aa]">
                    {demoError}
                  </p>
                ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-[#eef3f8] px-6 py-4 sm:px-8">
                {demoSaving && demoUploadProgress !== null ? (
                  <div className="w-full min-w-0 sm:mr-auto sm:max-w-xs">
                    <div className="mb-1 flex items-center justify-between text-xs text-[#687181]">
                      <span>{demoUploadStatusText}</span>
                      <span>{demoUploadProgress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#e8eef5]">
                      <div
                        className="h-full rounded-full bg-[#2365aa] transition-[width] duration-200"
                        style={{ width: `${demoUploadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : null}
                <button
                  type="submit"
                  disabled={demoSaving}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#2365aa] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {demoSaving
                    ? demoUploadButtonText
                    : editingDemo
                      ? "Update demo"
                      : "Add demo"}
                  <ArrowUpRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={closeDemoModal}
                  className="cursor-pointer rounded-full border border-[#d7e6f3] bg-[#EFF7FC] px-6 py-3 text-sm font-semibold text-[#2365aa] transition hover:bg-[#e7f1fa]"
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
          className={`fixed inset-0 z-[200] flex bg-[#0b1220]/72 backdrop-blur-[2px] ${
            playingDemoExpanded
              ? "items-stretch p-0"
              : "items-center justify-center p-4 sm:p-6"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={playingDemo.title}
          onClick={() => {
            setPlayingDemoExpanded(false);
            setPlayingDemo(null);
          }}
        >
          <div
            className={`relative flex w-full flex-col overflow-hidden bg-[#0b1220] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] ${
              playingDemoExpanded
                ? "h-full max-w-none rounded-none shadow-none"
                : "max-w-[960px] rounded-[20px]"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <h3 className="m-0 truncate text-sm font-semibold text-white sm:text-base">
                {playingDemo.title}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlayingDemoExpanded((v) => !v)}
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label={playingDemoExpanded ? "Minimize" : "Maximize"}
                >
                  {playingDemoExpanded ? (
                    <Minimize2 size={18} />
                  ) : (
                    <Maximize2 size={18} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPlayingDemoExpanded(false);
                    setPlayingDemo(null);
                  }}
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Close video"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div
              className={
                playingDemoExpanded
                  ? "relative min-h-0 w-full flex-1 bg-black"
                  : "relative aspect-video w-full bg-black"
              }
            >
              <DemoVideoPlayer
                title={playingDemo.title}
                videoUrl={playingDemo.videoUrl}
                videoId={playingDemo.videoId}
                poster={playingDemo.thumbnailUrl}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
