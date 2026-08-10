/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
SYSTEM CONFIGURATION
config.js
Version 1.0
==========================================================*/

"use strict";

/*==========================================================
SYSTEM CONFIGURATION
==========================================================*/

const CONFIG = {

    COMPANY_NAME : "Serentica Renewables",

    APPLICATION_NAME :

        "Serentica Site Manpower Management System",

    VERSION : "1.0",

    AUTHOR :

        "Serentica Renewables",

    DEFAULT_LANGUAGE :

        "en-IN",

    DEFAULT_TIMEZONE :

        "Asia/Kolkata"

};


/*==========================================================
SYSTEM INFORMATION
==========================================================*/

CONFIG.SYSTEM = {

    BUILD : "Production",

    RELEASE_YEAR : "2026",

    COUNTRY : "India",

    DATE_FORMAT : "DD-MM-YYYY",

    TIME_FORMAT : "24H"

};


/*==========================================================
SYSTEM REFRESH
==========================================================*/

CONFIG.REFRESH = {

    DASHBOARD : 30000,

    NOTIFICATION : 30000,

    CHART : 30000

};


/*==========================================================
SYSTEM LIMITS
==========================================================*/

CONFIG.LIMITS = {

    DASHBOARD_WIDGET_LIMIT : 10,

    RECENT_ACTIVITY_LIMIT : 10,

    TIMELINE_LIMIT : 100,

    EXPORT_LIMIT : 1000

};


/*==========================================================
SYSTEM READY
==========================================================*/

console.log(

    "System Configuration Loaded."

);
/*==========================================================
THEME CONFIGURATION
==========================================================*/

/*==========================================================
BRAND COLORS
==========================================================*/

CONFIG.THEME = {

    PRIMARY : "#33A7B5",

    PRIMARY_DARK : "#278B97",

    PRIMARY_LIGHT : "#DDF4F6",

    BACKGROUND : "#F5F7FA",

    CARD : "#FFFFFF",

    TEXT : "#1F2937",

    TEXT_LIGHT : "#6B7280",

    BORDER : "#E5E7EB",

    WHITE : "#FFFFFF",

    BLACK : "#000000"

};


/*==========================================================
STATUS COLORS
==========================================================*/

CONFIG.THEME.STATUS = {

    SUCCESS : "#16A34A",

    WARNING : "#F59E0B",

    DANGER : "#DC2626",

    INFO : "#2563EB",

    NEUTRAL : "#6B7280"

};


/*==========================================================
DASHBOARD COLORS
==========================================================*/

CONFIG.THEME.DASHBOARD = {

    EMPLOYEE : "#33A7B5",

    DEPLOYMENT : "#2563EB",

    RECALL : "#F59E0B",

    KPI : "#16A34A",

    PRODUCTIVITY : "#7C3AED",

    RISK : "#DC2626",

    ATTENDANCE : "#0891B2",

    PERFORMANCE : "#059669"

};


/*==========================================================
SIDEBAR
==========================================================*/

CONFIG.THEME.SIDEBAR = {

    BACKGROUND : "#FFFFFF",

    ACTIVE : "#33A7B5",

    HOVER : "#DDF4F6",

    TEXT : "#1F2937",

    TEXT_ACTIVE : "#FFFFFF"

};


/*==========================================================
BUTTON COLORS
==========================================================*/

CONFIG.THEME.BUTTONS = {

    PRIMARY : "#33A7B5",

    SUCCESS : "#16A34A",

    WARNING : "#F59E0B",

    DANGER : "#DC2626",

    SECONDARY : "#6B7280"

};


/*==========================================================
CHART COLORS
==========================================================*/

CONFIG.THEME.CHARTS = {

    PRIMARY : "#33A7B5",

    SUCCESS : "#16A34A",

    WARNING : "#F59E0B",

    DANGER : "#DC2626",

    INFO : "#2563EB",

    PURPLE : "#7C3AED",

    NEUTRAL : "#94A3B8"

};


/*==========================================================
FONT CONFIGURATION
==========================================================*/

CONFIG.THEME.FONT = {

    FAMILY :

        "Inter, Arial, Helvetica, sans-serif",

    HEADING_WEIGHT : 700,

    SUBHEADING_WEIGHT : 600,

    BODY_WEIGHT : 400,

    BUTTON_WEIGHT : 600

};


/*==========================================================
BORDER RADIUS
==========================================================*/

CONFIG.THEME.RADIUS = {

    SMALL : "6px",

    MEDIUM : "10px",

    LARGE : "16px",

    PILL : "999px"

};


/*==========================================================
SHADOWS
==========================================================*/

CONFIG.THEME.SHADOW = {

    SMALL :

        "0 1px 3px rgba(0,0,0,0.08)",

    MEDIUM :

        "0 4px 12px rgba(0,0,0,0.10)",

    LARGE :

        "0 8px 24px rgba(0,0,0,0.12)"

};


/*==========================================================
SYSTEM THEME READY
==========================================================*/

console.log(

    "Theme Configuration Loaded."

);
/*==========================================================
DEPARTMENTS, ROLES & CLUSTERS
==========================================================*/

/*==========================================================
SITE CONFIGURATION
==========================================================*/

CONFIG.SITES = {

    PRIMARY : "Koppal",

    AVAILABLE : [

        "Koppal",

        "Fatehgarh"

    ]

};


/*==========================================================
DEPARTMENT MASTER
==========================================================*/

CONFIG.DEPARTMENTS = [

    "QHSE",

    "Civil",

    "Mechanical",

    "Electrical",

    "SCADA",

    "Stores",

    "Land Acquisition",

    "ROW",

    "Administration",

    "HR",

    "Finance",

    "PMO",

    "Planning",

    "Contracts",

    "Security",

    "IT"

];


/*==========================================================
CLUSTER MASTER
==========================================================*/

CONFIG.CLUSTERS = [

    "Cluster 1",

    "Cluster 2",

    "Cluster 3"

];


/*==========================================================
USER ROLES
==========================================================*/

CONFIG.ROLES = {

    ADMIN : "Admin",

    EXECUTIVE : "Executive",

    PROJECT_MANAGER : "Project Manager",

    LEAD : "Lead",

    EMPLOYEE : "Employee"

};


/*==========================================================
ROLE ACCESS LEVELS
==========================================================*/

CONFIG.ACCESS_LEVELS = {

    ADMIN : 5,

    EXECUTIVE : 4,

    PROJECT_MANAGER : 3,

    LEAD : 2,

    EMPLOYEE : 1

};


/*==========================================================
ROLE PERMISSIONS
==========================================================*/

CONFIG.PERMISSIONS = {

    ADMIN : [

        "VIEW_ALL",

        "CREATE_EMPLOYEE",

        "EDIT_EMPLOYEE",

        "DELETE_EMPLOYEE",

        "DEPLOY_EMPLOYEE",

        "RECALL_EMPLOYEE",

        "APPROVE_DEPLOYMENT",

        "VIEW_REPORTS",

        "EXPORT_DATA",

        "MANAGE_USERS"

    ],

    EXECUTIVE : [

        "VIEW_ALL",

        "VIEW_REPORTS",

        "EXPORT_DATA"

    ],

    PROJECT_MANAGER : [

        "VIEW_TEAM",

        "EDIT_TEAM",

        "DEPLOY_EMPLOYEE",

        "RECALL_EMPLOYEE",

        "APPROVE_DEPLOYMENT",

        "VIEW_REPORTS"

    ],

    LEAD : [

        "VIEW_TEAM",

        "EDIT_TEAM",

        "REQUEST_DEPLOYMENT",

        "REQUEST_RECALL",

        "VIEW_KPI"

    ],

    EMPLOYEE : [

        "VIEW_PROFILE",

        "VIEW_KPI",

        "VIEW_PERFORMANCE"

    ]

};


/*==========================================================
DEPARTMENT GROUPS
==========================================================*/

CONFIG.DEPARTMENT_GROUPS = {

    PROJECT_EXECUTION : [

        "Civil",

        "Mechanical",

        "Electrical",

        "SCADA"

    ],

    PROJECT_SUPPORT : [

        "QHSE",

        "Stores",

        "Land Acquisition",

        "ROW",

        "PMO",

        "Planning",

        "Contracts"

    ],

    CORPORATE_SUPPORT : [

        "Administration",

        "HR",

        "Finance",

        "Security",

        "IT"

    ]

};


/*==========================================================
DEPARTMENT CONFIGURATION READY
==========================================================*/

console.log(

    "Department, Role & Cluster Configuration Loaded."

);
/*==========================================================
STATUS, KPI & PERFORMANCE CONFIGURATION
==========================================================*/

/*==========================================================
EMPLOYEE STATUS
==========================================================*/

CONFIG.EMPLOYEE_STATUS = {

    ACTIVE : "Active",

    INACTIVE : "Inactive",

    ON_LEAVE : "On Leave",

    RESIGNED : "Resigned",

    TERMINATED : "Terminated"

};


/*==========================================================
DEPLOYMENT STATUS
==========================================================*/

CONFIG.DEPLOYMENT_STATUS = {

    AVAILABLE : "Available",

    READY : "Ready for Deployment",

    PENDING : "Pending",

    APPROVED : "Approved",

    DEPLOYED : "Deployed",

    RECALL_PENDING : "Recall Pending",

    RECALLED : "Recalled",

    REJECTED : "Rejected"

};


/*==========================================================
DEPLOYMENT PRIORITY
==========================================================*/

CONFIG.DEPLOYMENT_PRIORITY = {

    LOW : "Low",

    MEDIUM : "Medium",

    HIGH : "High",

    CRITICAL : "Critical"

};


/*==========================================================
TASK STATUS
==========================================================*/

CONFIG.TASK_STATUS = {

    NOT_STARTED : "Not Started",

    IN_PROGRESS : "In Progress",

    COMPLETED : "Completed",

    OVERDUE : "Overdue",

    ON_HOLD : "On Hold"

};


/*==========================================================
KPI CONFIGURATION
==========================================================*/

CONFIG.KPI = {

    MIN_SCORE : 0,

    MAX_SCORE : 100,

    TARGET_SCORE : 80,

    EXCELLENT_SCORE : 90,

    GOOD_SCORE : 80,

    AVERAGE_SCORE : 65,

    RISK_SCORE : 50

};


/*==========================================================
PERFORMANCE LEVELS
==========================================================*/

CONFIG.PERFORMANCE = {

    EXCELLENT : "Excellent",

    GOOD : "Good",

    AVERAGE : "Average",

    NEEDS_IMPROVEMENT : "Needs Improvement",

    HIGH_RISK : "High Risk"

};


/*==========================================================
PERFORMANCE THRESHOLDS
==========================================================*/

CONFIG.PERFORMANCE_THRESHOLDS = {

    EXCELLENT : 90,

    GOOD : 80,

    AVERAGE : 65,

    NEEDS_IMPROVEMENT : 50,

    HIGH_RISK : 0

};


/*==========================================================
EFFICIENCY CONFIGURATION
==========================================================*/

CONFIG.EFFICIENCY = {

    MIN_SCORE : 0,

    MAX_SCORE : 100,

    HIGH : 90,

    GOOD : 80,

    MODERATE : 65,

    LOW : 50

};


/*==========================================================
NOTIFICATION TYPES
==========================================================*/

CONFIG.NOTIFICATION_TYPES = {

    INFO : "info",

    SUCCESS : "success",

    WARNING : "warning",

    ERROR : "error",

    DEPLOYMENT : "deployment",

    RECALL : "recall",

    KPI : "kpi",

    SYSTEM : "system"

};


/*==========================================================
APPROVAL STATUS
==========================================================*/

CONFIG.APPROVAL_STATUS = {

    PENDING : "Pending",

    APPROVED : "Approved",

    REJECTED : "Rejected"

};


/*==========================================================
REQUEST STATUS
==========================================================*/

CONFIG.REQUEST_STATUS = {

    PENDING : "Pending",

    PROCESSING : "Processing",

    COMPLETED : "Completed",

    CANCELLED : "Cancelled"

};


/*==========================================================
STATUS CONFIGURATION READY
==========================================================*/

console.log(

    "Status, KPI & Performance Configuration Loaded."

);
/*==========================================================
ICONS, UI CONSTANTS & FINAL INITIALIZATION
==========================================================*/

/*==========================================================
ICON CONFIGURATION
==========================================================*/

CONFIG.ICONS = {

    DASHBOARD : "fa-gauge-high",

    EMPLOYEE : "fa-user",

    EMPLOYEES : "fa-users",

    DEPLOYMENT : "fa-paper-plane",

    RECALL : "fa-rotate-left",

    KPI : "fa-chart-line",

    PERFORMANCE : "fa-award",

    PRODUCTIVITY : "fa-chart-column",

    ATTENDANCE : "fa-calendar-check",

    NOTIFICATION : "fa-bell",

    SEARCH : "fa-magnifying-glass",

    FILTER : "fa-filter",

    SETTINGS : "fa-gear",

    ORGANISATION : "fa-sitemap",

    REPORT : "fa-file-lines",

    EXPORT : "fa-download",

    EDIT : "fa-pen",

    DELETE : "fa-trash",

    ADD : "fa-plus",

    CLOSE : "fa-xmark",

    CHECK : "fa-check",

    WARNING : "fa-triangle-exclamation",

    ERROR : "fa-circle-xmark",

    MENU : "fa-bars",

    LOGOUT : "fa-right-from-bracket",

    PROFILE : "fa-circle-user",

    CLOCK : "fa-clock",

    LOCATION : "fa-location-dot"

};


/*==========================================================
LOCAL STORAGE KEYS
==========================================================*/

CONFIG.STORAGE = {

    CURRENT_USER :

        "serentica_current_user",

    CURRENT_ROLE :

        "serentica_current_role",

    SESSION :

        "serentica_session",

    EMPLOYEES :

        "serentica_employees",

    DEPLOYMENTS :

        "serentica_deployments",

    RECALLS :

        "serentica_recalls",

    NOTIFICATIONS :

        "serentica_notifications",

    SETTINGS :

        "serentica_settings"

};


/*==========================================================
UI CONFIGURATION
==========================================================*/

CONFIG.UI = {

    TOAST_DURATION : 4000,

    MODAL_ANIMATION : 200,

    SIDEBAR_WIDTH : "260px",

    MOBILE_BREAKPOINT : 768,

    TABLE_PAGE_SIZE : 10,

    SEARCH_MIN_LENGTH : 2

};


/*==========================================================
VALIDATION CONFIGURATION
==========================================================*/

CONFIG.VALIDATION = {

    EMPLOYEE_ID_MIN_LENGTH : 3,

    EMPLOYEE_NAME_MIN_LENGTH : 2,

    PASSWORD_MIN_LENGTH : 8,

    PHONE_LENGTH : 10,

    MAX_REMARKS_LENGTH : 500

};


/*==========================================================
DATE & TIME CONFIGURATION
==========================================================*/

CONFIG.DATE_TIME = {

    LOCALE : "en-IN",

    TIMEZONE : "Asia/Kolkata",

    DATE_OPTIONS : {

        day : "2-digit",

        month : "2-digit",

        year : "numeric"

    },

    TIME_OPTIONS : {

        hour : "2-digit",

        minute : "2-digit",

        hour12 : false

    }

};


/*==========================================================
SYSTEM FEATURES
==========================================================*/

CONFIG.FEATURES = {

    LIVE_DASHBOARD : true,

    NOTIFICATIONS : true,

    DEPLOYMENT_WORKFLOW : true,

    RECALL_WORKFLOW : true,

    KPI_TRACKING : true,

    EFFICIENCY_TRACKING : true,

    REPORTS : true,

    EXPORT : true,

    RESPONSIVE_UI : true

};


/*==========================================================
CONFIGURATION VALIDATION
==========================================================*/

CONFIG.validate = function(){

    const requiredProperties = [

        "COMPANY_NAME",

        "APPLICATION_NAME",

        "VERSION",

        "THEME",

        "SITES",

        "DEPARTMENTS",

        "CLUSTERS",

        "ROLES",

        "EMPLOYEE_STATUS",

        "DEPLOYMENT_STATUS",

        "KPI",

        "PERFORMANCE",

        "ICONS",

        "STORAGE"

    ];


    for(const property of requiredProperties){

        if(

            typeof CONFIG[property] ===

            "undefined"

        ){

            console.error(

                "Missing configuration: " +

                property

            );

            return false;

        }

    }


    return true;

};


/*==========================================================
CONFIGURATION SYSTEM INFORMATION
==========================================================*/

CONFIG.getSystemInformation = function(){

    return{

        company:

            this.COMPANY_NAME,

        application:

            this.APPLICATION_NAME,

        version:

            this.VERSION,

        environment:

            this.SYSTEM.BUILD,

        language:

            this.DEFAULT_LANGUAGE,

        timezone:

            this.DEFAULT_TIMEZONE,

        departments:

            this.DEPARTMENTS.length,

        clusters:

            this.CLUSTERS.length,

        sites:

            this.SITES.AVAILABLE.length

    };

};


/*==========================================================
FINAL CONFIGURATION VALIDATION
==========================================================*/

if(CONFIG.validate()){

    console.log(

        "========================================"

    );

    console.log(

        CONFIG.APPLICATION_NAME

    );

    console.log(

        "Version : " + CONFIG.VERSION

    );

    console.log(

        "Configuration : Ready"

    );

    console.log(

        "========================================"

    );

}else{

    console.error(

        "Configuration validation failed."

    );

}
