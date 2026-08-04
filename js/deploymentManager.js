/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
DEPLOYMENT MANAGER
deploymentManager.js
Version 1.0
==========================================================*/

"use strict";

/*==========================================================
DEPLOYMENT MANAGER
==========================================================*/

const DeploymentManager = {

    deployments:[],

    recalls:[],

    approvals:[],

    deploymentHistory:[],

    recallHistory:[],

    activeDeployments:[]

};


/*==========================================================
DEPLOYMENT STATUS
==========================================================*/

DeploymentManager.STATUS={

    PENDING:"Pending",

    APPROVED:"Approved",

    DEPLOYED:"Deployed",

    REJECTED:"Rejected",

    RECALLED:"Recalled"

};


/*==========================================================
DEPLOYMENT PRIORITY
==========================================================*/

DeploymentManager.PRIORITY={

    LOW:"Low",

    MEDIUM:"Medium",

    HIGH:"High",

    CRITICAL:"Critical"

};


/*==========================================================
GET ACTIVE DEPLOYMENTS
==========================================================*/

DeploymentManager.getActiveDeployments=function(){

    return this.activeDeployments;

};


/*==========================================================
GET DEPLOYMENT HISTORY
==========================================================*/

DeploymentManager.getDeploymentHistory=function(){

    return this.deploymentHistory;

};


/*==========================================================
GET RECALL HISTORY
==========================================================*/

DeploymentManager.getRecallHistory=function(){

    return this.recallHistory;

};


/*==========================================================
SYSTEM READY
==========================================================*/

console.log(

    "Deployment Manager Loaded."

);
/*==========================================================
DEPLOYMENT REQUEST ENGINE
==========================================================*/

/*==========================================================
CREATE DEPLOYMENT REQUEST
==========================================================*/

DeploymentManager.createDeploymentRequest = function({

    employeeID,

    currentSite,

    targetSite,

    requestedBy,

    priority="Medium",

    expectedReturnDate="",

    remarks=""

}){

    const employee = EmployeeDatabase.employees.find(

        emp => emp.employeeID === employeeID

    );

    if(!employee){

        console.error(

            "Employee not found."

        );

        return null;

    }

    const deployment = {

        deploymentID:

            "DEP" + Date.now(),

        employeeID:

            employee.employeeID,

        employeeName:

            employee.employeeName,

        currentSite:

            currentSite,

        targetSite:

            targetSite,

        requestedBy:

            requestedBy,

        approvedBy:

            "",

        requestDate:

            new Date(),

        deploymentDate:

            "",

        expectedReturnDate:

            expectedReturnDate,

        priority:

            priority,

        status:

            this.STATUS.PENDING,

        remarks:

            remarks

    };

    this.deployments.push(

        deployment

    );

    this.approvals.push(

        deployment

    );

    return deployment;

};


/*==========================================================
GET DEPLOYMENT REQUEST
==========================================================*/

DeploymentManager.getDeploymentRequest = function(deploymentID){

    return this.deployments.find(

        deployment =>

            deployment.deploymentID === deploymentID

    );

};


/*==========================================================
GET ALL DEPLOYMENT REQUESTS
==========================================================*/

DeploymentManager.getDeploymentRequests = function(){

    return this.deployments;

};


/*==========================================================
GET PENDING DEPLOYMENTS
==========================================================*/

DeploymentManager.getPendingDeployments = function(){

    return this.deployments.filter(

        deployment =>

            deployment.status === this.STATUS.PENDING

    );

};


/*==========================================================
GET DEPLOYMENTS BY EMPLOYEE
==========================================================*/

DeploymentManager.getEmployeeDeployments = function(employeeID){

    return this.deployments.filter(

        deployment =>

            deployment.employeeID === employeeID

    );

};


/*==========================================================
GET DEPLOYMENTS BY SITE
==========================================================*/

DeploymentManager.getSiteDeployments = function(site){

    return this.deployments.filter(

        deployment =>

            deployment.targetSite === site

    );

};


/*==========================================================
DELETE DEPLOYMENT REQUEST
==========================================================*/

DeploymentManager.deleteDeploymentRequest = function(deploymentID){

    this.deployments =

        this.deployments.filter(

            deployment =>

                deployment.deploymentID !== deploymentID

        );

    this.approvals =

        this.approvals.filter(

            deployment =>

                deployment.deploymentID !== deploymentID

        );

};
/*==========================================================
DEPLOYMENT APPROVAL WORKFLOW
==========================================================*/

/*==========================================================
APPROVE DEPLOYMENT
==========================================================*/

DeploymentManager.approveDeployment = function(

    deploymentID,

    approvedBy

){

    const deployment = this.getDeploymentRequest(

        deploymentID

    );

    if(!deployment){

        console.error(

            "Deployment request not found."

        );

        return false;

    }

    deployment.status = this.STATUS.APPROVED;

    deployment.approvedBy = approvedBy;

    deployment.approvalDate = new Date();

    return true;

};


/*==========================================================
REJECT DEPLOYMENT
==========================================================*/

DeploymentManager.rejectDeployment = function(

    deploymentID,

    approvedBy,

    remarks=""

){

    const deployment = this.getDeploymentRequest(

        deploymentID

    );

    if(!deployment){

        console.error(

            "Deployment request not found."

        );

        return false;

    }

    deployment.status = this.STATUS.REJECTED;

    deployment.approvedBy = approvedBy;

    deployment.approvalDate = new Date();

    deployment.remarks = remarks;

    return true;

};


/*==========================================================
GET APPROVED DEPLOYMENTS
==========================================================*/

DeploymentManager.getApprovedDeployments = function(){

    return this.deployments.filter(

        deployment =>

            deployment.status === this.STATUS.APPROVED

    );

};


/*==========================================================
GET REJECTED DEPLOYMENTS
==========================================================*/

DeploymentManager.getRejectedDeployments = function(){

    return this.deployments.filter(

        deployment =>

            deployment.status === this.STATUS.REJECTED

    );

};


/*==========================================================
GET APPROVAL QUEUE
==========================================================*/

DeploymentManager.getApprovalQueue = function(){

    return this.approvals.filter(

        deployment =>

            deployment.status === this.STATUS.PENDING

    );

};


/*==========================================================
GET APPROVAL STATISTICS
==========================================================*/

DeploymentManager.getApprovalStatistics = function(){

    return{

        pending:

            this.getPendingDeployments().length,

        approved:

            this.getApprovedDeployments().length,

        rejected:

            this.getRejectedDeployments().length

    };

};


/*==========================================================
CHECK APPROVAL STATUS
==========================================================*/

DeploymentManager.isApproved = function(

    deploymentID

){

    const deployment = this.getDeploymentRequest(

        deploymentID

    );

    return deployment

        ? deployment.status === this.STATUS.APPROVED

        : false;

};
/*==========================================================
DEPLOYMENT EXECUTION ENGINE
==========================================================*/

/*==========================================================
EXECUTE DEPLOYMENT
==========================================================*/

DeploymentManager.executeDeployment = function(

    deploymentID

){

    const deployment = this.getDeploymentRequest(

        deploymentID

    );

    if(!deployment){

        console.error(

            "Deployment request not found."

        );

        return false;

    }

    if(

        deployment.status !== this.STATUS.APPROVED

    ){

        console.error(

            "Deployment has not been approved."

        );

        return false;

    }

    const employee = EmployeeDatabase.employees.find(

        emp =>

            emp.employeeID === deployment.employeeID

    );

    if(!employee){

        console.error(

            "Employee not found."

        );

        return false;

    }

    deployment.status = this.STATUS.DEPLOYED;

    deployment.deploymentDate = new Date();

    employee.deploymentStatus = "Deployed";

    employee.currentSite = deployment.targetSite;

    employee.currentDeploymentID =

        deployment.deploymentID;

    this.activeDeployments.push(

        deployment

    );

    this.deploymentHistory.push(

        deployment

    );

    return true;

};


/*==========================================================
GET ACTIVE DEPLOYMENT
==========================================================*/

DeploymentManager.getActiveDeployment = function(

    employeeID

){

    return this.activeDeployments.find(

        deployment=>

            deployment.employeeID===employeeID

    );

};


/*==========================================================
CHECK DEPLOYMENT STATUS
==========================================================*/

DeploymentManager.isEmployeeDeployed = function(

    employeeID

){

    return this.activeDeployments.some(

        deployment=>

            deployment.employeeID===employeeID

    );

};


/*==========================================================
GET DEPLOYED EMPLOYEES
==========================================================*/

DeploymentManager.getDeployedEmployees = function(){

    return EmployeeDatabase.employees.filter(

        employee=>

            employee.deploymentStatus==="Deployed"

    );

};


/*==========================================================
GET AVAILABLE EMPLOYEES
==========================================================*/

DeploymentManager.getAvailableEmployees = function(){

    return EmployeeDatabase.employees.filter(

        employee=>

            employee.deploymentStatus!=="Deployed"

    );

};


/*==========================================================
DEPLOYMENT COUNT
==========================================================*/

DeploymentManager.getDeploymentCount = function(){

    return this.activeDeployments.length;

};


/*==========================================================
DEPLOYMENT SUMMARY
==========================================================*/

DeploymentManager.getDeploymentSummary = function(){

    return{

        totalDeployments:

            this.deployments.length,

        activeDeployments:

            this.activeDeployments.length,

        approvedDeployments:

            this.getApprovedDeployments().length,

        pendingDeployments:

            this.getPendingDeployments().length,

        rejectedDeployments:

            this.getRejectedDeployments().length

    };

};
/*==========================================================
RECALL ENGINE
==========================================================*/

/*==========================================================
CREATE RECALL REQUEST
==========================================================*/

DeploymentManager.createRecallRequest = function(

    deploymentID,

    requestedBy,

    remarks=""

){

    const deployment = this.getDeploymentRequest(

        deploymentID

    );

    if(!deployment){

        console.error(

            "Deployment not found."

        );

        return null;

    }

    const recall = {

        recallID:

            "REC" + Date.now(),

        deploymentID:

            deployment.deploymentID,

        employeeID:

            deployment.employeeID,

        employeeName:

            deployment.employeeName,

        requestedBy:

            requestedBy,

        requestDate:

            new Date(),

        status:

            this.STATUS.PENDING,

        remarks:

            remarks

    };

    this.recalls.push(

        recall

    );

    return recall;

};


/*==========================================================
EXECUTE RECALL
==========================================================*/

DeploymentManager.executeRecall = function(

    recallID,

    approvedBy

){

    const recall = this.recalls.find(

        item =>

            item.recallID === recallID

    );

    if(!recall){

        console.error(

            "Recall request not found."

        );

        return false;

    }

    const deployment = this.getDeploymentRequest(

        recall.deploymentID

    );

    if(!deployment){

        console.error(

            "Deployment not found."

        );

        return false;

    }

    const employee = EmployeeDatabase.employees.find(

        emp =>

            emp.employeeID === recall.employeeID

    );

    if(!employee){

        console.error(

            "Employee not found."

        );

        return false;

    }

    recall.status = this.STATUS.RECALLED;

    recall.approvedBy = approvedBy;

    recall.recallDate = new Date();

    deployment.status = this.STATUS.RECALLED;

    employee.deploymentStatus = "Available";

    employee.currentDeploymentID = "";

    employee.currentSite = deployment.currentSite;

    this.activeDeployments =

        this.activeDeployments.filter(

            item =>

                item.deploymentID !== deployment.deploymentID

        );

    this.recallHistory.push(

        recall

    );

    return true;

};


/*==========================================================
GET ALL RECALL REQUESTS
==========================================================*/

DeploymentManager.getRecallRequests = function(){

    return this.recalls;

};


/*==========================================================
GET PENDING RECALLS
==========================================================*/

DeploymentManager.getPendingRecalls = function(){

    return this.recalls.filter(

        recall =>

            recall.status === this.STATUS.PENDING

    );

};


/*==========================================================
GET COMPLETED RECALLS
==========================================================*/

DeploymentManager.getCompletedRecalls = function(){

    return this.recalls.filter(

        recall =>

            recall.status === this.STATUS.RECALLED

    );

};


/*==========================================================
GET RECALL COUNT
==========================================================*/

DeploymentManager.getRecallCount = function(){

    return this.recalls.length;

};


/*==========================================================
GET ACTIVE DEPLOYMENT COUNT
==========================================================*/

DeploymentManager.getActiveDeploymentCount = function(){

    return this.activeDeployments.length;

};
/*==========================================================
DEPLOYMENT ANALYTICS ENGINE
==========================================================*/

/*==========================================================
GET DEPLOYMENT ANALYTICS
==========================================================*/

DeploymentManager.getDeploymentAnalytics = function(){

    return{

        totalRequests:

            this.deployments.length,

        activeDeployments:

            this.activeDeployments.length,

        completedRecalls:

            this.getCompletedRecalls().length,

        pendingDeployments:

            this.getPendingDeployments().length,

        approvedDeployments:

            this.getApprovedDeployments().length,

        rejectedDeployments:

            this.getRejectedDeployments().length

    };

};


/*==========================================================
DEPLOYMENTS BY PRIORITY
==========================================================*/

DeploymentManager.getDeploymentsByPriority = function(){

    return{

        low:

            this.deployments.filter(

                deployment =>

                    deployment.priority === this.PRIORITY.LOW

            ).length,

        medium:

            this.deployments.filter(

                deployment =>

                    deployment.priority === this.PRIORITY.MEDIUM

            ).length,

        high:

            this.deployments.filter(

                deployment =>

                    deployment.priority === this.PRIORITY.HIGH

            ).length,

        critical:

            this.deployments.filter(

                deployment =>

                    deployment.priority === this.PRIORITY.CRITICAL

            ).length

    };

};


/*==========================================================
DEPLOYMENTS BY STATUS
==========================================================*/

DeploymentManager.getDeploymentsByStatus = function(){

    return{

        pending:

            this.getPendingDeployments().length,

        approved:

            this.getApprovedDeployments().length,

        deployed:

            this.activeDeployments.length,

        recalled:

            this.getCompletedRecalls().length,

        rejected:

            this.getRejectedDeployments().length

    };

};


/*==========================================================
SITE DEPLOYMENT SUMMARY
==========================================================*/

DeploymentManager.getSiteDeploymentSummary = function(){

    const summary = {};

    this.activeDeployments.forEach(deployment=>{

        if(!summary[deployment.targetSite]){

            summary[deployment.targetSite]=0;

        }

        summary[deployment.targetSite]++;

    });

    return summary;

};


/*==========================================================
EMPLOYEE DEPLOYMENT HISTORY
==========================================================*/

DeploymentManager.getEmployeeDeploymentHistory=function(

    employeeID

){

    return this.deploymentHistory.filter(

        deployment=>

            deployment.employeeID===employeeID

    );

};


/*==========================================================
AVERAGE DEPLOYMENT DURATION
==========================================================*/

DeploymentManager.getAverageDeploymentDuration=function(){

    let totalDays=0;

    let completed=0;

    this.recallHistory.forEach(recall=>{

        const deployment=this.getDeploymentRequest(

            recall.deploymentID

        );

        if(

            deployment &&

            deployment.deploymentDate &&

            recall.recallDate

        ){

            const start=

                new Date(deployment.deploymentDate);

            const end=

                new Date(recall.recallDate);

            totalDays +=

                Math.ceil(

                    (end-start)/(1000*60*60*24)

                );

            completed++;

        }

    });

    return completed===0

        ?0

        :Math.round(totalDays/completed);

};


/*==========================================================
DEPLOYMENT DASHBOARD DATA
==========================================================*/

DeploymentManager.getDashboardData=function(){

    return{

        analytics:

            this.getDeploymentAnalytics(),

        status:

            this.getDeploymentsByStatus(),

        priority:

            this.getDeploymentsByPriority(),

        sites:

            this.getSiteDeploymentSummary(),

        averageDeploymentDays:

            this.getAverageDeploymentDuration()

    };

};
/*==========================================================
TIMELINE & AUDIT HISTORY
==========================================================*/

/*==========================================================
TIMELINE STORAGE
==========================================================*/

DeploymentManager.timeline = [];


/*==========================================================
ADD TIMELINE EVENT
==========================================================*/

DeploymentManager.addTimelineEvent = function(

    type,

    employeeID,

    description,

    performedBy

){

    this.timeline.push({

        eventID:

            "EVT" + Date.now(),

        eventType:

            type,

        employeeID:

            employeeID,

        description:

            description,

        performedBy:

            performedBy,

        eventDate:

            new Date()

    });

};


/*==========================================================
GET COMPLETE TIMELINE
==========================================================*/

DeploymentManager.getTimeline = function(){

    return this.timeline;

};


/*==========================================================
GET EMPLOYEE TIMELINE
==========================================================*/

DeploymentManager.getEmployeeTimeline = function(

    employeeID

){

    return this.timeline.filter(

        event =>

            event.employeeID === employeeID

    );

};


/*==========================================================
GET TIMELINE BY TYPE
==========================================================*/

DeploymentManager.getTimelineByType = function(

    eventType

){

    return this.timeline.filter(

        event =>

            event.eventType === eventType

    );

};


/*==========================================================
GET LATEST EVENTS
==========================================================*/

DeploymentManager.getLatestEvents = function(

    limit = 10

){

    return this.timeline

        .slice()

        .sort(

            (a,b)=>

                new Date(b.eventDate)-new Date(a.eventDate)

        )

        .slice(

            0,

            limit

        );

};


/*==========================================================
CLEAR TIMELINE
==========================================================*/

DeploymentManager.clearTimeline = function(){

    this.timeline = [];

};


/*==========================================================
EXPORT TIMELINE
==========================================================*/

DeploymentManager.exportTimeline = function(){

    return JSON.stringify(

        this.timeline,

        null,

        2

    );

};


/*==========================================================
AUDIT SUMMARY
==========================================================*/

DeploymentManager.getAuditSummary = function(){

    return{

        totalEvents:

            this.timeline.length,

        deploymentEvents:

            this.getTimelineByType(

                "Deployment"

            ).length,

        recallEvents:

            this.getTimelineByType(

                "Recall"

            ).length,

        approvalEvents:

            this.getTimelineByType(

                "Approval"

            ).length,

        rejectionEvents:

            this.getTimelineByType(

                "Rejection"

            ).length

    };

};


/*==========================================================
SYSTEM EVENT
==========================================================*/

DeploymentManager.addTimelineEvent(

    "System",

    "",

    "Deployment Manager Started.",

    "System"

);
/*==========================================================
DASHBOARD INTEGRATION
==========================================================*/

/*==========================================================
GET DASHBOARD SUMMARY
==========================================================*/

DeploymentManager.getDashboardSummary = function(){

    return{

        totalRequests:

            this.deployments.length,

        activeDeployments:

            this.activeDeployments.length,

        pendingApprovals:

            this.getPendingDeployments().length,

        approvedDeployments:

            this.getApprovedDeployments().length,

        completedRecalls:

            this.getCompletedRecalls().length

    };

};


/*==========================================================
GET DASHBOARD CARDS
==========================================================*/

DeploymentManager.getDashboardCards = function(){

    return[

        {

            title:"Active Deployments",

            value:this.activeDeployments.length,

            icon:"fa-paper-plane",

            color:"primary"

        },

        {

            title:"Pending Approvals",

            value:this.getPendingDeployments().length,

            icon:"fa-clock",

            color:"warning"

        },

        {

            title:"Completed Recalls",

            value:this.getCompletedRecalls().length,

            icon:"fa-rotate-left",

            color:"success"

        },

        {

            title:"Rejected Requests",

            value:this.getRejectedDeployments().length,

            icon:"fa-circle-xmark",

            color:"danger"

        }

    ];

};


/*==========================================================
GET RECENT DEPLOYMENTS
==========================================================*/

DeploymentManager.getRecentDeployments = function(limit=10){

    return this.deploymentHistory

        .slice()

        .sort(

            (a,b)=>

                new Date(b.deploymentDate)-

                new Date(a.deploymentDate)

        )

        .slice(

            0,

            limit

        );

};


/*==========================================================
GET RECENT RECALLS
==========================================================*/

DeploymentManager.getRecentRecalls = function(limit=10){

    return this.recallHistory

        .slice()

        .sort(

            (a,b)=>

                new Date(b.recallDate)-

                new Date(a.recallDate)

        )

        .slice(

            0,

            limit

        );

};


/*==========================================================
GET DASHBOARD WIDGETS
==========================================================*/

DeploymentManager.getDashboardWidgets = function(){

    return{

        recentDeployments:

            this.getRecentDeployments(),

        recentRecalls:

            this.getRecentRecalls(),

        deploymentAnalytics:

            this.getDeploymentAnalytics(),

        auditSummary:

            this.getAuditSummary()

    };

};


/*==========================================================
REFRESH DASHBOARD DATA
==========================================================*/

DeploymentManager.refreshDashboard = function(){

    return{

        summary:

            this.getDashboardSummary(),

        cards:

            this.getDashboardCards(),

        widgets:

            this.getDashboardWidgets()

    };

};
/*==========================================================
FINAL INITIALIZATION & SYSTEM STARTUP
==========================================================*/

/*==========================================================
VALIDATE DEPLOYMENT MANAGER
==========================================================*/

DeploymentManager.validateSystem = function(){

    const requiredModules = [

        "EmployeeDatabase",

        "EmployeeManager"

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

        "Deployment Manager Validation Successful."

    );

    return true;

};


/*==========================================================
INITIALIZE DEPLOYMENT MANAGER
==========================================================*/

DeploymentManager.initialize = function(){

    if(!this.validateSystem()){

        return;

    }

    console.log(

        "Initializing Deployment Manager..."

    );

    this.timeline = [];

    this.deployments = [];

    this.recalls = [];

    this.approvals = [];

    this.deploymentHistory = [];

    this.recallHistory = [];

    this.activeDeployments = [];

    this.addTimelineEvent(

        "System",

        "",

        "Deployment Manager Initialized.",

        "System"

    );

    console.log(

        "Deployment Manager Initialized Successfully."

    );

};


/*==========================================================
GET SYSTEM INFORMATION
==========================================================*/

DeploymentManager.getSystemInformation = function(){

    return{

        module:"Deployment Manager",

        version:"1.0",

        company:"Serentica Renewables",

        totalDeployments:

            this.deployments.length,

        activeDeployments:

            this.activeDeployments.length,

        pendingApprovals:

            this.getPendingDeployments().length,

        generatedOn:

            new Date()

    };

};


/*==========================================================
SYSTEM SHUTDOWN
==========================================================*/

DeploymentManager.shutdown = function(){

    console.log(

        "Deployment Manager Stopped."

    );

};


/*==========================================================
AUTO INITIALIZATION
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        DeploymentManager.initialize();

    }

);


/*==========================================================
SYSTEM READY
==========================================================*/

console.log("========================================");
console.log("Serentica Renewables");
console.log("Deployment Manager");
console.log("Version : 1.0");
console.log("Status : Ready");
console.log("========================================");
