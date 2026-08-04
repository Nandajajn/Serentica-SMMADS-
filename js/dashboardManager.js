/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
DASHBOARD MANAGER
dashboardManager.js
Version 1.0
==========================================================*/

"use strict";

/*==========================================================
DASHBOARD MANAGER
==========================================================*/

const DashboardManager = {

    currentUser:null,

    currentRole:null,

    currentDepartment:null,

    currentPage:null,

    dashboardData:{},

    widgets:{},

    charts:{}

};


/*==========================================================
SET CURRENT USER
==========================================================*/

DashboardManager.setCurrentUser=function(user){

    this.currentUser=user;

    this.currentRole=user.role;

    this.currentDepartment=user.department;

};


/*==========================================================
GET CURRENT USER
==========================================================*/

DashboardManager.getCurrentUser=function(){

    return this.currentUser;

};


/*==========================================================
SET ACTIVE PAGE
==========================================================*/

DashboardManager.setCurrentPage=function(page){

    this.currentPage=page;

};


/*==========================================================
GET ACTIVE PAGE
==========================================================*/

DashboardManager.getCurrentPage=function(){

    return this.currentPage;

};


/*==========================================================
GET USER ROLE
==========================================================*/

DashboardManager.getUserRole=function(){

    return this.currentRole;

};


/*==========================================================
IS ADMIN
==========================================================*/

DashboardManager.isAdmin=function(){

    return this.currentRole==="Admin";

};


/*==========================================================
IS PROJECT MANAGER
==========================================================*/

DashboardManager.isProjectManager=function(){

    return this.currentRole==="Project Manager";

};


/*==========================================================
IS LEAD
==========================================================*/

DashboardManager.isLead=function(){

    return this.currentRole==="Lead";

};


/*==========================================================
IS EMPLOYEE
==========================================================*/

DashboardManager.isEmployee=function(){

    return this.currentRole==="Employee";

};


/*==========================================================
SYSTEM READY
==========================================================*/

console.log(

    "Dashboard Manager Loaded."

);
/*==========================================================
DASHBOARD DATA LOADER
==========================================================*/

/*==========================================================
LOAD DASHBOARD DATA
==========================================================*/

DashboardManager.loadDashboardData = function(){

    this.dashboardData = {

        employeeSummary:

            EmployeeManager.getDashboardSummary(),

        executiveSummary:

            EfficiencyEngine.getExecutiveDashboard(),

        kpiSummary:

            KPIEngine.getDashboardData(),

        notifications:

            EmployeeManager.getNotifications(),

        charts:

            EfficiencyEngine.getExecutiveCharts()

    };

};


/*==========================================================
GET DASHBOARD DATA
==========================================================*/

DashboardManager.getDashboardData = function(){

    return this.dashboardData;

};


/*==========================================================
GET EXECUTIVE SUMMARY
==========================================================*/

DashboardManager.getExecutiveSummary = function(){

    return this.dashboardData.executiveSummary;

};


/*==========================================================
GET KPI SUMMARY
==========================================================*/

DashboardManager.getKPISummary = function(){

    return this.dashboardData.kpiSummary;

};


/*==========================================================
GET EMPLOYEE SUMMARY
==========================================================*/

DashboardManager.getEmployeeSummary = function(){

    return this.dashboardData.employeeSummary;

};


/*==========================================================
GET NOTIFICATIONS
==========================================================*/

DashboardManager.getNotifications = function(){

    return this.dashboardData.notifications || [];

};


/*==========================================================
GET CHART DATA
==========================================================*/

DashboardManager.getCharts = function(){

    return this.dashboardData.charts || {};

};


/*==========================================================
REFRESH DASHBOARD DATA
==========================================================*/

DashboardManager.refreshDashboardData = function(){

    EmployeeManager.refreshDecisionEngine();

    EmployeeManager.refreshNotifications();

    KPIEngine.refreshDashboard();

    EfficiencyEngine.refresh();

    this.loadDashboardData();

};


/*==========================================================
INITIAL DATA LOAD
==========================================================*/

DashboardManager.loadDashboardData();
/*==========================================================
DASHBOARD CARDS ENGINE
==========================================================*/

/*==========================================================
TOTAL EMPLOYEES CARD
==========================================================*/

DashboardManager.getTotalEmployeesCard = function(){

    return{

        title:"Total Employees",

        value:EmployeeDatabase.employees.length,

        icon:"fa-users",

        color:"primary"

    };

};


/*==========================================================
PROMOTION PIPELINE CARD
==========================================================*/

DashboardManager.getPromotionCard=function(){

    return{

        title:"Promotion Ready",

        value:EmployeeManager.getPromotionCandidates().length,

        icon:"fa-arrow-up",

        color:"success"

    };

};


/*==========================================================
DEPLOYMENT CARD
==========================================================*/

DashboardManager.getDeploymentCard=function(){

    return{

        title:"Ready For Deployment",

        value:EmployeeManager.getDeploymentCandidates().length,

        icon:"fa-paper-plane",

        color:"info"

    };

};


/*==========================================================
RECALL CARD
==========================================================*/

DashboardManager.getRecallCard=function(){

    return{

        title:"Recall Required",

        value:EmployeeManager.getRecallCandidates().length,

        icon:"fa-rotate-left",

        color:"warning"

    };

};


/*==========================================================
HIGH RISK CARD
==========================================================*/

DashboardManager.getHighRiskCard=function(){

    return{

        title:"High Risk Employees",

        value:EmployeeManager.getHighRiskEmployees().length,

        icon:"fa-triangle-exclamation",

        color:"danger"

    };

};


/*==========================================================
WORKFORCE HEALTH CARD
==========================================================*/

DashboardManager.getWorkforceHealthCard=function(){

    return{

        title:"Workforce Health",

        value:

            EfficiencyEngine

            .calculateWorkforceHealthIndex(),

        status:

            EfficiencyEngine

            .getWorkforceStatus(),

        icon:"fa-heart-pulse",

        color:"success"

    };

};


/*==========================================================
ORGANISATION KPI CARD
==========================================================*/

DashboardManager.getKPICard=function(){

    return{

        title:"Organisation KPI",

        value:

            KPIEngine

            .getOrganisationAverageKPI(),

        icon:"fa-chart-line",

        color:"primary"

    };

};


/*==========================================================
ORGANISATION PRODUCTIVITY CARD
==========================================================*/

DashboardManager.getProductivityCard=function(){

    return{

        title:"Organisation Productivity",

        value:

            EfficiencyEngine

            .calculateOrganisationProductivity(),

        icon:"fa-chart-column",

        color:"secondary"

    };

};


/*==========================================================
ALL DASHBOARD CARDS
==========================================================*/

DashboardManager.getDashboardCards=function(){

    return[

        this.getTotalEmployeesCard(),

        this.getPromotionCard(),

        this.getDeploymentCard(),

        this.getRecallCard(),

        this.getHighRiskCard(),

        this.getWorkforceHealthCard(),

        this.getKPICard(),

        this.getProductivityCard()

    ];

};
/*==========================================================
DASHBOARD WIDGETS ENGINE
==========================================================*/

/*==========================================================
TOP PERFORMERS WIDGET
==========================================================*/

DashboardManager.getTopPerformersWidget = function(limit=5){

    return{

        title:"Top Performers",

        type:"table",

        data:EfficiencyEngine

            .getTopProductiveEmployees(limit)

    };

};


/*==========================================================
LOW PERFORMERS WIDGET
==========================================================*/

DashboardManager.getLowPerformersWidget = function(limit=5){

    return{

        title:"Needs Improvement",

        type:"table",

        data:EfficiencyEngine

            .getLowProductiveEmployees(limit)

    };

};


/*==========================================================
DEPARTMENT RANKING WIDGET
==========================================================*/

DashboardManager.getDepartmentRankingWidget = function(){

    return{

        title:"Department Rankings",

        type:"table",

        data:EfficiencyEngine

            .rankDepartments()

    };

};


/*==========================================================
EXECUTIVE ALERTS WIDGET
==========================================================*/

DashboardManager.getExecutiveAlertsWidget = function(){

    return{

        title:"Executive Alerts",

        type:"alerts",

        data:EfficiencyEngine

            .getExecutiveAlerts()

    };

};


/*==========================================================
NOTIFICATION WIDGET
==========================================================*/

DashboardManager.getNotificationWidget = function(){

    return{

        title:"Notifications",

        type:"notifications",

        data:EmployeeManager

            .getNotifications()

    };

};


/*==========================================================
RECENT DEPLOYMENTS WIDGET
==========================================================*/

DashboardManager.getRecentDeploymentsWidget = function(){

    return{

        title:"Recent Deployments",

        type:"table",

        data:EmployeeDatabase

            .deploymentHistory

            .slice(-10)

            .reverse()

    };

};


/*==========================================================
RECENT RECALLS WIDGET
==========================================================*/

DashboardManager.getRecentRecallsWidget = function(){

    return{

        title:"Recent Recalls",

        type:"table",

        data:EmployeeDatabase

            .recallHistory

            .slice(-10)

            .reverse()

    };

};


/*==========================================================
QUICK STATISTICS WIDGET
==========================================================*/

DashboardManager.getQuickStatisticsWidget = function(){

    return{

        title:"Quick Statistics",

        type:"statistics",

        data:{

            departments:

                DepartmentMaster.length,

            employees:

                EmployeeDatabase.employees.length,

            promotionReady:

                EmployeeManager

                    .getPromotionCandidates()

                    .length,

            deploymentReady:

                EmployeeManager

                    .getDeploymentCandidates()

                    .length,

            recallRequired:

                EmployeeManager

                    .getRecallCandidates()

                    .length

        }

    };

};


/*==========================================================
ALL WIDGETS
==========================================================*/

DashboardManager.getDashboardWidgets = function(){

    return{

        topPerformers:

            this.getTopPerformersWidget(),

        lowPerformers:

            this.getLowPerformersWidget(),

        departmentRanking:

            this.getDepartmentRankingWidget(),

        executiveAlerts:

            this.getExecutiveAlertsWidget(),

        notifications:

            this.getNotificationWidget(),

        deployments:

            this.getRecentDeploymentsWidget(),

        recalls:

            this.getRecentRecallsWidget(),

        quickStatistics:

            this.getQuickStatisticsWidget()

    };

};
/*==========================================================
NOTIFICATION CENTER
==========================================================*/

/*==========================================================
NOTIFICATION STORAGE
==========================================================*/

DashboardManager.notifications = [];


/*==========================================================
LOAD NOTIFICATIONS
==========================================================*/

DashboardManager.loadNotifications = function(){

    this.notifications =

        EmployeeManager.getNotifications() || [];

};


/*==========================================================
GET ALL NOTIFICATIONS
==========================================================*/

DashboardManager.getAllNotifications = function(){

    return this.notifications;

};


/*==========================================================
GET UNREAD NOTIFICATIONS
==========================================================*/

DashboardManager.getUnreadNotifications = function(){

    return this.notifications.filter(

        notification =>

            notification.read !== true

    );

};


/*==========================================================
UNREAD COUNT
==========================================================*/

DashboardManager.getUnreadCount = function(){

    return this.getUnreadNotifications().length;

};


/*==========================================================
MARK AS READ
==========================================================*/

DashboardManager.markNotificationAsRead = function(notificationID){

    const notification =

        this.notifications.find(

            item =>

                item.id === notificationID

        );

    if(notification){

        notification.read = true;

    }

};


/*==========================================================
MARK ALL AS READ
==========================================================*/

DashboardManager.markAllNotificationsAsRead = function(){

    this.notifications.forEach(notification=>{

        notification.read = true;

    });

};


/*==========================================================
ADD NOTIFICATION
==========================================================*/

DashboardManager.addNotification = function(

    title,

    message,

    type="info"

){

    this.notifications.unshift({

        id:"NTF"+Date.now(),

        title:title,

        message:message,

        type:type,

        read:false,

        createdOn:new Date()

    });

};


/*==========================================================
DELETE NOTIFICATION
==========================================================*/

DashboardManager.deleteNotification=function(notificationID){

    this.notifications =

        this.notifications.filter(

            notification=>

                notification.id!==notificationID

        );

};


/*==========================================================
CLEAR ALL NOTIFICATIONS
==========================================================*/

DashboardManager.clearNotifications=function(){

    this.notifications=[];

};


/*==========================================================
REFRESH NOTIFICATIONS
==========================================================*/

DashboardManager.refreshNotifications=function(){

    EmployeeManager.refreshNotifications();

    this.loadNotifications();

};


/*==========================================================
INITIAL LOAD
==========================================================*/

DashboardManager.loadNotifications();
/*==========================================================
CHARTS INTEGRATION ENGINE
==========================================================*/

/*==========================================================
LOAD ALL CHARTS
==========================================================*/

DashboardManager.loadCharts = function(){

    this.charts = {

        departmentEfficiency:
            EfficiencyEngine.getDepartmentEfficiencyChart(),

        productivity:
            EfficiencyEngine.getProductivityChart(),

        workforceHealth:
            EfficiencyEngine.getWorkforceHealthChart(),

        attendance:
            EfficiencyEngine.getAttendanceChart(),

        taskStatus:
            EfficiencyEngine.getTaskChart()

    };

};


/*==========================================================
GET LOADED CHARTS
==========================================================*/

DashboardManager.getLoadedCharts = function(){

    return this.charts;

};


/*==========================================================
GET DEPARTMENT CHART
==========================================================*/

DashboardManager.getDepartmentChart = function(){

    return this.charts.departmentEfficiency;

};


/*==========================================================
GET PRODUCTIVITY CHART
==========================================================*/

DashboardManager.getProductivityChart = function(){

    return this.charts.productivity;

};


/*==========================================================
GET WORKFORCE HEALTH CHART
==========================================================*/

DashboardManager.getWorkforceHealthChart = function(){

    return this.charts.workforceHealth;

};


/*==========================================================
GET ATTENDANCE CHART
==========================================================*/

DashboardManager.getAttendanceChart = function(){

    return this.charts.attendance;

};


/*==========================================================
GET TASK STATUS CHART
==========================================================*/

DashboardManager.getTaskChart = function(){

    return this.charts.taskStatus;

};


/*==========================================================
REFRESH ALL CHARTS
==========================================================*/

DashboardManager.refreshCharts = function(){

    KPIEngine.refreshDashboard();

    EfficiencyEngine.refresh();

    this.loadCharts();

};


/*==========================================================
CHECK WHETHER CHARTS ARE LOADED
==========================================================*/

DashboardManager.areChartsReady = function(){

    return (

        this.charts &&

        Object.keys(this.charts).length > 0

    );

};


/*==========================================================
INITIAL CHART LOAD
==========================================================*/

DashboardManager.loadCharts();
/*==========================================================
ROLE BASED DASHBOARD ENGINE
==========================================================*/

/*==========================================================
ADMIN DASHBOARD
==========================================================*/

DashboardManager.getAdminDashboard = function(){

    return{

        role:"Admin",

        cards:this.getDashboardCards(),

        widgets:this.getDashboardWidgets(),

        charts:this.getLoadedCharts(),

        notifications:this.getAllNotifications()

    };

};


/*==========================================================
PROJECT MANAGER DASHBOARD
==========================================================*/

DashboardManager.getProjectManagerDashboard = function(){

    return{

        role:"Project Manager",

        cards:[

            this.getTotalEmployeesCard(),

            this.getDeploymentCard(),

            this.getRecallCard(),

            this.getWorkforceHealthCard()

        ],

        widgets:{

            departmentRanking:

                this.getDepartmentRankingWidget(),

            executiveAlerts:

                this.getExecutiveAlertsWidget(),

            deployments:

                this.getRecentDeploymentsWidget(),

            recalls:

                this.getRecentRecallsWidget()

        },

        charts:this.getLoadedCharts()

    };

};


/*==========================================================
LEAD DASHBOARD
==========================================================*/

DashboardManager.getLeadDashboard = function(){

    return{

        role:"Lead",

        cards:[

            this.getTotalEmployeesCard(),

            this.getPromotionCard(),

            this.getHighRiskCard()

        ],

        widgets:{

            topPerformers:

                this.getTopPerformersWidget(),

            lowPerformers:

                this.getLowPerformersWidget(),

            notifications:

                this.getNotificationWidget()

        },

        charts:{

            productivity:

                this.getProductivityChart(),

            attendance:

                this.getAttendanceChart()

        }

    };

};


/*==========================================================
EMPLOYEE DASHBOARD
==========================================================*/

DashboardManager.getEmployeeDashboard = function(){

    const employee=this.getCurrentUser();

    return{

        role:"Employee",

        employee:employee,

        notifications:this.getNotificationWidget(),

        cards:[

            {

                title:"Efficiency",

                value:employee.efficiencyScore,

                icon:"fa-gauge-high",

                color:"primary"

            },

            {

                title:"Average KPI",

                value:employee.averageKPI,

                icon:"fa-chart-line",

                color:"success"

            },

            {

                title:"Performance Rating",

                value:employee.performanceRating,

                icon:"fa-award",

                color:"warning"

            }

        ]

    };

};


/*==========================================================
EXECUTIVE DASHBOARD
==========================================================*/

DashboardManager.getExecutiveDashboard = function(){

    return{

        role:"Executive",

        cards:this.getDashboardCards(),

        widgets:{

            executiveAlerts:

                this.getExecutiveAlertsWidget(),

            departmentRanking:

                this.getDepartmentRankingWidget(),

            topPerformers:

                this.getTopPerformersWidget(),

            quickStatistics:

                this.getQuickStatisticsWidget()

        },

        charts:this.getLoadedCharts()

    };

};


/*==========================================================
ROLE ROUTER
==========================================================*/

DashboardManager.getDashboard = function(){

    switch(this.currentRole){

        case "Admin":

            return this.getAdminDashboard();

        case "Project Manager":

            return this.getProjectManagerDashboard();

        case "Lead":

            return this.getLeadDashboard();

        case "Executive":

            return this.getExecutiveDashboard();

        default:

            return this.getEmployeeDashboard();

    }

};


/*==========================================================
GET DASHBOARD BY ROLE
==========================================================*/

DashboardManager.loadDashboardByRole = function(role){

    this.currentRole=role;

    return this.getDashboard();

};
/*==========================================================
LIVE DASHBOARD REFRESH ENGINE
==========================================================*/

/*==========================================================
AUTO REFRESH CONFIGURATION
==========================================================*/

DashboardManager.refreshInterval = null;

DashboardManager.refreshTime = 30000; //30 Seconds


/*==========================================================
REFRESH COMPLETE DASHBOARD
==========================================================*/

DashboardManager.refreshDashboard = function(){

    console.log("Refreshing Dashboard...");

    /* Refresh Business Engines */

    EmployeeManager.refreshDecisionEngine();

    EmployeeManager.refreshNotifications();

    KPIEngine.refreshDashboard();

    EfficiencyEngine.refresh();

    /* Reload Dashboard Data */

    this.loadDashboardData();

    this.refreshNotifications();

    this.refreshCharts();

};


/*==========================================================
START AUTO REFRESH
==========================================================*/

DashboardManager.startAutoRefresh = function(){

    if(this.refreshInterval){

        clearInterval(this.refreshInterval);

    }

    this.refreshInterval = setInterval(()=>{

        this.refreshDashboard();

    },this.refreshTime);

};


/*==========================================================
STOP AUTO REFRESH
==========================================================*/

DashboardManager.stopAutoRefresh = function(){

    if(this.refreshInterval){

        clearInterval(this.refreshInterval);

        this.refreshInterval = null;

    }

};


/*==========================================================
CHANGE REFRESH TIME
==========================================================*/

DashboardManager.setRefreshTime = function(seconds){

    this.refreshTime = seconds*1000;

    this.startAutoRefresh();

};


/*==========================================================
MANUAL REFRESH
==========================================================*/

DashboardManager.manualRefresh = function(){

    this.refreshDashboard();

};


/*==========================================================
PAGE VISIBILITY HANDLER
==========================================================*/

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            DashboardManager.stopAutoRefresh();

        }else{

            DashboardManager.refreshDashboard();

            DashboardManager.startAutoRefresh();

        }

    }

);


/*==========================================================
WINDOW FOCUS
==========================================================*/

window.addEventListener(

    "focus",

    ()=>{

        DashboardManager.refreshDashboard();

    }

);


/*==========================================================
WINDOW ONLINE
==========================================================*/

window.addEventListener(

    "online",

    ()=>{

        DashboardManager.refreshDashboard();

    }

);


/*==========================================================
WINDOW OFFLINE
==========================================================*/

window.addEventListener(

    "offline",

    ()=>{

        console.warn(

            "System is Offline."

        );

    }

);
/*==========================================================
FINAL INITIALIZATION & SYSTEM STARTUP
==========================================================*/

/*==========================================================
VALIDATE DASHBOARD MANAGER
==========================================================*/

DashboardManager.validateSystem = function(){

    const requiredModules = [

        "EmployeeDatabase",

        "EmployeeManager",

        "KPIEngine",

        "EfficiencyEngine"

    ];

    for(const module of requiredModules){

        if(typeof window[module] === "undefined"){

            console.error(

                module + " is missing."

            );

            return false;

        }

    }

    console.log(

        "Dashboard Manager Validation Successful."

    );

    return true;

};


/*==========================================================
INITIALIZE DASHBOARD
==========================================================*/

DashboardManager.initialize = function(){

    if(!this.validateSystem()){

        return;

    }

    this.loadDashboardData();

    this.loadNotifications();

    this.loadCharts();

    this.startAutoRefresh();

    console.log(

        "Dashboard Manager Initialized Successfully."

    );

};


/*==========================================================
GET SYSTEM INFORMATION
==========================================================*/

DashboardManager.getSystemInformation = function(){

    return{

        module:"Dashboard Manager",

        version:"1.0",

        company:"Serentica Renewables",

        currentRole:this.currentRole,

        currentPage:this.currentPage,

        refreshInterval:this.refreshTime,

        totalEmployees:

            EmployeeDatabase.employees.length,

        generatedOn:new Date()

    };

};


/*==========================================================
SYSTEM SHUTDOWN
==========================================================*/

DashboardManager.shutdown = function(){

    this.stopAutoRefresh();

    console.log(

        "Dashboard Manager Stopped."

    );

};


/*==========================================================
AUTO INITIALIZATION
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        DashboardManager.initialize();

    }

);


/*==========================================================
SYSTEM READY
==========================================================*/

console.log("========================================");
console.log("Serentica Renewables");
console.log("Dashboard Manager");
console.log("Version : 1.0");
console.log("Status : Ready");
console.log("========================================");
