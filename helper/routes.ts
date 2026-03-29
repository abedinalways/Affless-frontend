import { conversationDirectory } from "@/public/demodata";

type RouteConfig = {
    label: string | ((...args: string[]) => string);
    href: string;
    buildHref?: (...parts: string[]) => string;
};

export const routes: Record<string, RouteConfig> = {
    home: {
        label: "Home",
        href: "/",
    },
    dashboardclient: {
        label: "Dashboard",
        href: "/client",
    },
    dashboardeditor: {
        label: "Dashboard",
        href: "/editor",
    },
    quickmatcheditor: {
        label: "Quick-Match Results",
        href: "/editor/quick-match-result",
    },
    platformsafetyrule: {
        label: "Platform Safety Rules",
        href: "/platform-safety"
    },
    editorprofile: {
        label: "Profile",
        href: "/editor/editor-profile"
    },
    browsejobs: {
        label: (id?: string) => {
            if (id) {
                const conversation = conversationDirectory.find(conv => conv.id === id);
                if (conversation) {
                    return `All of ${conversation.name}'s Jobs`;
                }
            }
            return "Browse Jobs";
        },
        href: "/editor/browse-job",
        buildHref: (id: string) => {
            if (id) {
                return `/editor/browse-job?clientid=${id}`;
            }
            return `/editor/browse-job`
        },
    },
    browsejobdetails: {
        label: "Job Details",
        href: "/editor/browse-job/",
        buildHref: (id: string) => `/editor/browse-job/${id}`,
    },
    editorpublicprofile: {
        label: "Editor Profile",
        href: "/editor-profile/",
        buildHref: (id: string) => `/editor-profile/${id}`,
    },
    clinetpublicprofile: {
        label: "Client Profile",
        href: "/client-profile/",
        buildHref: (id: string) => `/client-profile/${id}`,
    },
    editormessages: {
        label: "Messages",
        href: "/editor/message"
    },
    editormessagesid: {
        label: "Direct Messages",
        href: "/editor/message/",
        buildHref: (id: string) => `/editor/message/${id}`,
    },
    editorjobs: {
        label: "My Jobs",
        href: "/editor/myproposal"
    },
    editorjobdetails: {
        label: "My Job Details",
        href: "/editor/myproposal/",
        buildHref: (id: string) => `/editor/myproposal/${id}`,
    },
    deliverproject: {
        label: "Deliver work",
        href: "/editor/delivery"
    },
    extenddeliverydate: {
        label: "Extend Delivery Date",
        href: "/editor/extend-delivery"
    },
    myjobproposals: {
        label: "My Job Proposals",
        href: "/editor/hire-request"
    },
    myjobproposalsdetails: {
        label: "My Job Proposal Details",
        href: "/editor/hire-request/",
        buildHref: (id: string) => `/editor/hire-request/${id}`,
    },
    earnings: {
        label: "Earnings",
        href: "/editor/earning"
    },
    howitworks: {
        label: "How It Works",
        href: "/howwork"
    },
    gettingstarted: {
        label: "Getting Started",
        href: "/getting-started"
    },
    helpcenter: {
        label: "Help Center",
        href: "/help-center"
    },
    contactus: {
        label: "Contact Us",
        href: "/contactus"
    },
    pricing: {
        label: "Pricing",
        href: "/pricing"
    },
    trustsafety: {
        label: "Trust & Safety",
        href: "/trustseftey"
    },
    successstories: {
        label: "Success Stories",
        href: "/success-story"
    },
    successstorydetails: {
        label: "Success Story Details",
        href: "/success-story/",
        buildHref: (id: string) => `/success-story/${id}`,
    },
    faq: {
        label: "FAQs",
        href: "/frequently-question"
    },
    postajob: {
        label: "Post a Job",
        href: "/client/post-job"
    },
    findeditors: {
        label: "Find Editors",
        href: "/client/find-editor"
    },
    hireaneditor: {
        label: "Hire a Editor",
        href: "/client/hire-vedio-editor"
    },
    paymentprotection: {
        label: "Payment Protection",
        href: "/payment-protection"
    },
    clientguide: {
        label: "Client Guide",
        href: "/client-guide"
    },
    paymentrules: {
        label: "Payment Rules",
        href: "/payment-rules"
    },
    editorresources: {
        label: "Editor Resources",
        href: "/editor-resource"
    },
    disputeresolution: {
        label: "Dispute Resolution",
        href: "/dispute-resoulation"
    },
    statuspage: {
        label: "Status Page",
        href: "/status-page"
    },
    termsconditions: {
        label: "Terms & Conditions",
        href: "/terms-condition"
    },
    quickmatchclient: {
        label: "Quick-Match Results",
        href: "/client/find-editor-match",
    },
    managejobs: {
        label: "Manage Jobs",
        href: "/client/manage-job"
    },
    managejobdetails: {
        label: "Manage Job Details",
        href: "/client/manage-job/",
        buildHref: (id: string) => `/client/manage-job/${id}`,
    },
    deliveryclient: {
        label: "Delivery",
        href: "/client/delivery"
    },
    messageclient: {
        label: "Messages",
        href: "/client/message"
    },
    messageclientid: {
        label: "Direct Messages",
        href: "/client/message",
        buildHref: (id: string) => `/client/message/${id}`,
    },
    jobproposal: {
        label: "Job Proposals",
        href: "/client/job-proposal"
    },
    jobproposaldetails: {
        label: "Job Proposal Details",
        href: "/client/job-proposal/",
        buildHref: (id: string) => `/client/job-proposal/${id}`,
    },
    bidsdetails: {
        label: "Proposal Details",
        href: "/client/bids-details/",
        buildHref: (id: string) => `/client/bids-details/${id}`,
    },
    paymenthistory: {
        label: "Payment History",
        href: "/client/payment-history"
    },
    addmoney: {
        label: "Add Money",
        href: "/client/add-money"
    },
    browseclientsjobs: {
        label: "Direct Messages",
        href: "/editor/message"
    }
};

export const parseRouteToken = (token?: string | null) => {
    const [rawKey, ...rawParts] = (token || "").split(":");
    const key = rawKey?.trim();
    const parts = rawParts.filter(Boolean);

    return {
        key,
        parts,
    };
};

export const getRouteConfig = (keyOrToken?: string | null): RouteConfig | undefined => {
    const { key } = parseRouteToken(keyOrToken);

    if (!key) {
        return undefined;
    }

    return routes[key];
};

export const getRouteHref = (keyOrToken: string, ...parts: string[]) => {
    const parsed = parseRouteToken(keyOrToken);
    const route = getRouteConfig(parsed.key);
    const resolvedParts = parts.length > 0 ? parts : parsed.parts;

    if (!route) {
        return "/";
    }

    if (route.buildHref) {
        return route.buildHref(...resolvedParts);
    }

    return route.href;
};

export const getRouteLabel = (keyOrToken: string, ...args: string[]): string => {
    const route = getRouteConfig(keyOrToken);
    if (!route) return "";
    if (typeof route.label === "function") {
        return route.label(...args);
    }
    return route.label;
};