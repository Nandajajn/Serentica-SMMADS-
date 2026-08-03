/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
MASTER EMPLOYEE DATABASE
employeeData.js
==========================================================*/

"use strict";

/*==========================================================
GLOBAL DATABASE
==========================================================*/

const EmployeeDatabase = {

    site: {

        siteName: "Koppal Wind & Solar",

        cluster: "Koppal",

        company: "Serentica Renewables"

    },

    departments: {},

    employees: [],

    roleTemplates: {},

    roleKPIs: {},

    notifications: [],

    deploymentHistory: [],

    recallHistory: []

};


/*==========================================================
ROLE MASTER
==========================================================*/

const RoleMaster = {

    "Cluster Head":{

        hierarchy:1,

        reportingTo:null

    },

    "Project Manager":{

        hierarchy:2,

        reportingTo:"Cluster Head"

    },

    "Department Head":{

        hierarchy:3,

        reportingTo:"Project Manager"

    },

    "Team Lead":{

        hierarchy:4,

        reportingTo:"Department Head"

    },

    "Engineer":{

        hierarchy:5,

        reportingTo:"Team Lead"

    },

    "Supervisor":{

        hierarchy:6,

        reportingTo:"Engineer"

    },

    "Technician":{

        hierarchy:7,

        reportingTo:"Supervisor"

    },

    "Executive":{

        hierarchy:5,

        reportingTo:"Team Lead"

    }

};


/*==========================================================
DEPARTMENT MASTER
==========================================================*/

const DepartmentMaster = [

    "Civil",

    "Mechanical",

    "Electrical",

    "QHSE",

    "Stores",

    "Land & ROW",

    "PMO",

    "Administration"

];


/*==========================================================
INITIALIZE DEPARTMENTS
==========================================================*/

DepartmentMaster.forEach(department=>{

    EmployeeDatabase.departments[department]={

        name:department,

        employees:[],

        sanctionedStrength:0,

        currentStrength:0,

        vacancies:0,

        averageKPI:0,

        averageEfficiency:0,

        deploymentReady:0,

        departmentHealth:0

    };

});/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
MASTER EMPLOYEE DATABASE
employeeData.js
==========================================================*/

"use strict";

/*==========================================================
GLOBAL DATABASE
==========================================================*/

const EmployeeDatabase = {

    site: {

        siteName: "Koppal Wind & Solar",

        cluster: "Koppal",

        company: "Serentica Renewables"

    },

    departments: {},

    employees: [],

    roleTemplates: {},

    roleKPIs: {},

    notifications: [],

    deploymentHistory: [],

    recallHistory: []

};


/*==========================================================
ROLE MASTER
==========================================================*/

const RoleMaster = {

    "Cluster Head":{

        hierarchy:1,

        reportingTo:null

    },

    "Project Manager":{

        hierarchy:2,

        reportingTo:"Cluster Head"

    },

    "Department Head":{

        hierarchy:3,

        reportingTo:"Project Manager"

    },

    "Team Lead":{

        hierarchy:4,

        reportingTo:"Department Head"

    },

    "Engineer":{

        hierarchy:5,

        reportingTo:"Team Lead"

    },

    "Supervisor":{

        hierarchy:6,

        reportingTo:"Engineer"

    },

    "Technician":{

        hierarchy:7,

        reportingTo:"Supervisor"

    },

    "Executive":{

        hierarchy:5,

        reportingTo:"Team Lead"

    }

};


/*==========================================================
DEPARTMENT MASTER
==========================================================*/

const DepartmentMaster = [

    "Civil",

    "Mechanical",

    "Electrical",

    "QHSE",

    "Stores",

    "Land & ROW",

    "PMO",

    "Administration"

];


/*==========================================================
INITIALIZE DEPARTMENTS
==========================================================*/

DepartmentMaster.forEach(department=>{

    EmployeeDatabase.departments[department]={

        name:department,

        employees:[],

        sanctionedStrength:0,

        currentStrength:0,

        vacancies:0,

        averageKPI:0,

        averageEfficiency:0,

        deploymentReady:0,

        departmentHealth:0

    };

});
/*==========================================================
EMPLOYEE CLASS
==========================================================*/

class Employee {

    constructor(data = {}) {

        /*==================================================
        BASIC INFORMATION
        ==================================================*/

        this.employeeID = data.employeeID || "";

        this.employeeName = data.employeeName || "";

        this.profilePhoto = data.profilePhoto || "assets/images/profile.png";

        this.department = data.department || "";

        this.role = data.role || "";

        this.designation = data.designation || "";

        this.reportingManager = data.reportingManager || "";

        this.teamLead = data.teamLead || "";

        this.clusterHead = data.clusterHead || "";

        this.projectManager = data.projectManager || "";

        /*==================================================
        PERSONAL DETAILS
        ==================================================*/

        this.email = data.email || "";

        this.phone = data.phone || "";

        this.gender = data.gender || "";

        this.dateOfBirth = data.dateOfBirth || "";

        this.bloodGroup = data.bloodGroup || "";

        this.address = data.address || "";

        this.emergencyContact = data.emergencyContact || "";

        /*==================================================
        EMPLOYMENT DETAILS
        ==================================================*/

        this.company = data.company || "Serentica Renewables";

        this.currentSite = data.currentSite || "Koppal";

        this.currentProject = data.currentProject || "";

        this.employmentType = data.employmentType || "";

        this.dateOfJoining = data.dateOfJoining || "";

        this.experience = data.experience || 0;

        this.noticePeriod = data.noticePeriod || "";

        this.status = data.status || "Active";

        /*==================================================
        ROLE INFORMATION
        ==================================================*/

        this.roleHierarchy = data.roleHierarchy || 0;

        this.jobDescription = data.jobDescription || "";

        this.roleKPIs = data.roleKPIs || [];

        this.currentTasks = data.currentTasks || [];

        /*==================================================
        DEPLOYMENT
        ==================================================*/

        this.deploymentStatus = data.deploymentStatus || "Not Deployed";

        this.readyForDeployment = data.readyForDeployment || false;

        this.deploymentRecommendation = data.deploymentRecommendation || "Pending";

        this.lastDeployment = data.lastDeployment || "";

        this.lastRecall = data.lastRecall || "";

        this.deploymentHistory = data.deploymentHistory || [];

        this.recallHistory = data.recallHistory || [];

        /*==================================================
        PERFORMANCE
        ==================================================*/

        this.kpiScores = data.kpiScores || [];

        this.averageKPI = data.averageKPI || 0;

        this.efficiencyScore = data.efficiencyScore || 0;

        this.performanceRating = data.performanceRating || "";

        this.managerRemarks = data.managerRemarks || "";

        this.teamLeadRemarks = data.teamLeadRemarks || "";

        this.clusterRemarks = data.clusterRemarks || "";

        /*==================================================
        TRAINING
        ==================================================*/

        this.trainingRequired = data.trainingRequired || [];

        this.completedTraining = data.completedTraining || [];

        this.certifications = data.certifications || [];

        /*==================================================
        SUCCESSION
        ==================================================*/

        this.promotionReady = data.promotionReady || false;

        this.successorFor = data.successorFor || "";

        this.riskLevel = data.riskLevel || "Low";

        /*==================================================
        SYSTEM
        ==================================================*/

        this.createdDate = data.createdDate || new Date();

        this.lastUpdated = data.lastUpdated || new Date();

    }

}
/*==========================================================
EMPLOYEE DATABASE MANAGER
==========================================================*/

const EmployeeManager = {

    /*======================================================
    ADD EMPLOYEE
    ======================================================*/

    addEmployee(employeeData) {

        const employee = new Employee(employeeData);

        EmployeeDatabase.employees.push(employee);

        this.updateDepartmentStatistics();

        return employee;

    },

    /*======================================================
    UPDATE EMPLOYEE
    ======================================================*/

    updateEmployee(employeeID, updatedData) {

        const employee = this.getEmployeeByID(employeeID);

        if (!employee) return false;

        Object.assign(employee, updatedData);

        employee.lastUpdated = new Date();

        this.updateDepartmentStatistics();

        return true;

    },

    /*======================================================
    DELETE EMPLOYEE
    ======================================================*/

    deleteEmployee(employeeID) {

        const index = EmployeeDatabase.employees.findIndex(

            employee => employee.employeeID === employeeID

        );

        if (index === -1) return false;

        EmployeeDatabase.employees.splice(index, 1);

        this.updateDepartmentStatistics();

        return true;

    },

    /*======================================================
    GET EMPLOYEE BY ID
    ======================================================*/

    getEmployeeByID(employeeID) {

        return EmployeeDatabase.employees.find(

            employee => employee.employeeID === employeeID

        );

    },

    /*======================================================
    GET EMPLOYEE BY NAME
    ======================================================*/

    getEmployeeByName(employeeName) {

        return EmployeeDatabase.employees.find(

            employee => employee.employeeName === employeeName

        );

    },

    /*======================================================
    GET EMPLOYEES BY DEPARTMENT
    ======================================================*/

    getEmployeesByDepartment(department) {

        return EmployeeDatabase.employees.filter(

            employee => employee.department === department

        );

    },

    /*======================================================
    GET EMPLOYEES BY ROLE
    ======================================================*/

    getEmployeesByRole(role) {

        return EmployeeDatabase.employees.filter(

            employee => employee.role === role

        );

    },

    /*======================================================
    GET EMPLOYEES BY REPORTING MANAGER
    ======================================================*/

    getEmployeesByReportingManager(managerName) {

        return EmployeeDatabase.employees.filter(

            employee => employee.reportingManager === managerName

        );

    },

    /*======================================================
    GET DEPLOYMENT READY EMPLOYEES
    ======================================================*/

    getDeploymentReadyEmployees() {

        return EmployeeDatabase.employees.filter(

            employee => employee.readyForDeployment === true

        );

    },

    /*======================================================
    GET PROMOTION READY EMPLOYEES
    ======================================================*/

    getPromotionReadyEmployees() {

        return EmployeeDatabase.employees.filter(

            employee => employee.promotionReady === true

        );

    },

    /*======================================================
    GET ACTIVE EMPLOYEES
    ======================================================*/

    getActiveEmployees() {

        return EmployeeDatabase.employees.filter(

            employee => employee.status === "Active"

        );

    },

    /*======================================================
    GET ALL EMPLOYEES
    ======================================================*/

    getAllEmployees() {

        return EmployeeDatabase.employees;

    }

};
/*==========================================================
DEPARTMENT STATISTICS ENGINE
==========================================================*/

EmployeeManager.updateDepartmentStatistics = function () {

    /*--------------------------------------------
    RESET ALL DEPARTMENTS
    ---------------------------------------------*/

    Object.values(EmployeeDatabase.departments).forEach(department => {

        department.employees = [];

        department.currentStrength = 0;

        department.averageKPI = 0;

        department.averageEfficiency = 0;

        department.deploymentReady = 0;

        department.departmentHealth = 0;

    });

    /*--------------------------------------------
    POPULATE EMPLOYEES
    ---------------------------------------------*/

    EmployeeDatabase.employees.forEach(employee => {

        const department =
            EmployeeDatabase.departments[employee.department];

        if (!department) return;

        department.employees.push(employee);

    });

    /*--------------------------------------------
    CALCULATE STATISTICS
    ---------------------------------------------*/

    Object.values(EmployeeDatabase.departments).forEach(department => {

        department.currentStrength = department.employees.length;

        /*-------------------------
        Average KPI
        --------------------------*/

        let totalKPI = 0;

        department.employees.forEach(employee => {

            totalKPI += Number(employee.averageKPI || 0);

        });

        department.averageKPI =

            department.currentStrength === 0

                ? 0

                : Number(
                    (
                        totalKPI /
                        department.currentStrength
                    ).toFixed(1)
                );

        /*-------------------------
        Average Efficiency
        --------------------------*/

        let totalEfficiency = 0;

        department.employees.forEach(employee => {

            totalEfficiency += Number(employee.efficiencyScore || 0);

        });

        department.averageEfficiency =

            department.currentStrength === 0

                ? 0

                : Number(
                    (
                        totalEfficiency /
                        department.currentStrength
                    ).toFixed(1)
                );

        /*-------------------------
        Deployment Ready
        --------------------------*/

        department.deploymentReady =

            department.employees.filter(employee =>

                employee.readyForDeployment === true

            ).length;

        /*-------------------------
        Vacancies
        --------------------------*/

        department.vacancies =

            Math.max(

                0,

                department.sanctionedStrength -

                department.currentStrength

            );

        /*-------------------------
        Department Health
        --------------------------*/

        department.departmentHealth =

            this.calculateDepartmentHealth(

                department

            );

    });

};
/*==========================================================
DEPARTMENT HEALTH ENGINE
==========================================================*/

EmployeeManager.calculateDepartmentHealth = function (department) {

    /*--------------------------------------------
    EMPTY DEPARTMENT
    ---------------------------------------------*/

    if (department.currentStrength === 0) {

        return 0;

    }

    /*--------------------------------------------
    KPI SCORE
    ---------------------------------------------*/

    const kpiScore = Number(department.averageKPI || 0);

    /*--------------------------------------------
    EFFICIENCY SCORE
    ---------------------------------------------*/

    const efficiencyScore = Number(

        department.averageEfficiency || 0

    );

    /*--------------------------------------------
    VACANCY SCORE
    ---------------------------------------------*/

    let vacancyScore = 100;

    if (department.sanctionedStrength > 0) {

        const vacancyPercentage =

            (department.vacancies /

                department.sanctionedStrength) * 100;

        vacancyScore =

            Math.max(

                0,

                100 - vacancyPercentage

            );

    }

    /*--------------------------------------------
    DEPLOYMENT SCORE
    ---------------------------------------------*/

    let deploymentScore = 100;

    if (department.currentStrength > 0) {

        deploymentScore =

            (

                department.deploymentReady /

                department.currentStrength

            ) * 100;

    }

    /*--------------------------------------------
    CRITICAL ROLE SCORE
    ---------------------------------------------*/

    let criticalRoleScore = 100;

    const hasLead = department.employees.some(

        employee =>

            employee.role === "Department Head" ||

            employee.role === "Team Lead"

    );

    if (!hasLead) {

        criticalRoleScore = 40;

    }

    /*--------------------------------------------
    FINAL HEALTH INDEX
    ---------------------------------------------*/

    const health =

        (

            (kpiScore * 0.30) +

            (efficiencyScore * 0.30) +

            (vacancyScore * 0.15) +

            (deploymentScore * 0.15) +

            (criticalRoleScore * 0.10)

        );

    return Number(

        health.toFixed(1)

    );

};

/*==========================================================
HEALTH STATUS LABEL
==========================================================*/

EmployeeManager.getHealthStatus = function (score) {

    if (score >= 90) {

        return "Excellent";

    }

    if (score >= 75) {

        return "Healthy";

    }

    if (score >= 60) {

        return "Average";

    }

    if (score >= 40) {

        return "Needs Attention";

    }

    return "Critical";

};

/*==========================================================
HEALTH COLOR
==========================================================*/

EmployeeManager.getHealthColor = function (score) {

    if (score >= 90) {

        return "#2ECC71";

    }

    if (score >= 75) {

        return "#27AE60";

    }

    if (score >= 60) {

        return "#F1C40F";

    }

    if (score >= 40) {

        return "#E67E22";

    }

    return "#E74C3C";

};
/*==========================================================
ROLE TEMPLATE ENGINE
Automatically assigns Job Description & KPIs
==========================================================*/

EmployeeDatabase.roleTemplates = {

    /*======================================================
    CLUSTER HEAD
    ======================================================*/

    "Cluster Head":{

        jobDescription:
            "Overall site leadership, operational excellence, strategic planning, manpower optimization and stakeholder management.",

        kpis:[

            "Overall Site Performance",

            "Project Delivery",

            "Safety Compliance",

            "Budget Control",

            "Resource Utilisation"

        ]

    },

    /*======================================================
    PROJECT MANAGER
    ======================================================*/

    "Project Manager":{

        jobDescription:
            "Responsible for complete project execution, planning, quality, manpower deployment and client coordination.",

        kpis:[

            "Project Progress",

            "Schedule Adherence",

            "Cost Performance",

            "Quality Compliance",

            "Safety Performance"

        ]

    },

    /*======================================================
    DEPARTMENT HEAD
    ======================================================*/

    "Department Head":{

        jobDescription:
            "Leads departmental execution, manpower allocation, technical coordination and performance monitoring.",

        kpis:[

            "Department Productivity",

            "Resource Utilisation",

            "Team Performance",

            "Quality",

            "Safety"

        ]

    },

    /*======================================================
    TEAM LEAD
    ======================================================*/

    "Team Lead":{

        jobDescription:
            "Coordinates daily activities, allocates work, monitors engineers and ensures timely execution.",

        kpis:[

            "Task Completion",

            "Team Productivity",

            "Planning",

            "Quality",

            "Safety"

        ]

    },

    /*======================================================
    ENGINEER
    ======================================================*/

    "Engineer":{

        jobDescription:
            "Responsible for execution, monitoring, reporting, quality and technical support.",

        kpis:[

            "Daily Productivity",

            "Quality Compliance",

            "Documentation",

            "Technical Accuracy",

            "Safety"

        ]

    },

    /*======================================================
    SUPERVISOR
    ======================================================*/

    "Supervisor":{

        jobDescription:
            "Supervises field execution, workforce management and adherence to site procedures.",

        kpis:[

            "Daily Output",

            "Labour Productivity",

            "Quality",

            "Safety",

            "Attendance"

        ]

    },

    /*======================================================
    TECHNICIAN
    ======================================================*/

    "Technician":{

        jobDescription:
            "Performs installation, maintenance, inspection and technical activities.",

        kpis:[

            "Work Completion",

            "Technical Accuracy",

            "Equipment Care",

            "Safety",

            "Attendance"

        ]

    },

    /*======================================================
    EXECUTIVE
    ======================================================*/

    "Executive":{

        jobDescription:
            "Supports departmental activities, reporting, documentation and coordination.",

        kpis:[

            "Documentation",

            "Task Completion",

            "Coordination",

            "Accuracy",

            "Timeliness"

        ]

    }

};


/*==========================================================
LOAD ROLE TEMPLATE
==========================================================*/

EmployeeManager.applyRoleTemplate = function(employee){

    const template =

        EmployeeDatabase.roleTemplates[employee.role];

    if(!template){

        return employee;

    }

    employee.jobDescription = template.jobDescription;

    employee.roleKPIs = [...template.kpis];

    return employee;

};
/*==========================================================
AUTOMATIC ROLE ASSIGNMENT ENGINE
==========================================================*/

EmployeeManager.assignRole = function(employeeID, role){

    /*--------------------------------------------
    Find Employee
    ---------------------------------------------*/

    const employee = this.getEmployeeByID(employeeID);

    if(!employee){

        console.error("Employee Not Found");

        return false;

    }

    /*--------------------------------------------
    Assign New Role
    ---------------------------------------------*/

    employee.role = role;

    /*--------------------------------------------
    Load JD & KPIs
    ---------------------------------------------*/

    this.applyRoleTemplate(employee);

    /*--------------------------------------------
    Update Hierarchy
    ---------------------------------------------*/

    this.updateReportingHierarchy(employee);

    /*--------------------------------------------
    Refresh Department Statistics
    ---------------------------------------------*/

    this.updateDepartmentStatistics();

    /*--------------------------------------------
    Refresh Dashboard
    ---------------------------------------------*/

    if(typeof DashboardManager !== "undefined"){

        DashboardManager.refresh();

    }

    /*--------------------------------------------
    Refresh Organisation Chart
    ---------------------------------------------*/

    if(typeof OrganisationManager !== "undefined"){

        OrganisationManager.refresh();

    }

    return true;

};


/*==========================================================
REPORTING HIERARCHY ENGINE
==========================================================*/

EmployeeManager.updateReportingHierarchy = function(employee){

    const hierarchy = RoleMaster[employee.role];

    if(!hierarchy){

        return;

    }

    employee.roleHierarchy = hierarchy.hierarchy;

};


/*==========================================================
CHANGE REPORTING MANAGER
==========================================================*/

EmployeeManager.changeReportingManager = function(

    employeeID,

    managerName

){

    const employee = this.getEmployeeByID(employeeID);

    if(!employee){

        return false;

    }

    employee.reportingManager = managerName;

    employee.lastUpdated = new Date();

    return true;

};


/*==========================================================
CHANGE TEAM LEAD
==========================================================*/

EmployeeManager.changeTeamLead = function(

    employeeID,

    teamLead

){

    const employee = this.getEmployeeByID(employeeID);

    if(!employee){

        return false;

    }

    employee.teamLead = teamLead;

    employee.lastUpdated = new Date();

    return true;

};


/*==========================================================
TRANSFER DEPARTMENT
==========================================================*/

EmployeeManager.transferDepartment = function(

    employeeID,

    newDepartment

){

    const employee = this.getEmployeeByID(employeeID);

    if(!employee){

        return false;

    }

    employee.department = newDepartment;

    employee.lastUpdated = new Date();

    this.updateDepartmentStatistics();

    return true;

};
/*==========================================================
AUTOMATIC KPI ENGINE
==========================================================*/

EmployeeManager.initializeKPIs = function(employee){

    if(!employee.roleKPIs || employee.roleKPIs.length === 0){

        this.applyRoleTemplate(employee);

    }

    employee.kpiScores = employee.roleKPIs.map(kpi => ({

        name: kpi,

        score: 0,

        remarks: ""

    }));

};


/*==========================================================
UPDATE KPI SCORE
==========================================================*/

EmployeeManager.updateKPIScore = function(

    employeeID,

    kpiName,

    score,

    remarks = ""

){

    const employee = this.getEmployeeByID(employeeID);

    if(!employee){

        return false;

    }

    if(!employee.kpiScores){

        this.initializeKPIs(employee);

    }

    const kpi = employee.kpiScores.find(

        item => item.name === kpiName

    );

    if(!kpi){

        return false;

    }

    kpi.score = Number(score);

    kpi.remarks = remarks;

    employee.averageKPI =

        this.calculateAverageKPI(employee);

    employee.lastUpdated = new Date();

    this.updateDepartmentStatistics();

    return true;

};


/*==========================================================
CALCULATE AVERAGE KPI
==========================================================*/

EmployeeManager.calculateAverageKPI = function(employee){

    if(

        !employee.kpiScores ||

        employee.kpiScores.length === 0

    ){

        return 0;

    }

    let total = 0;

    employee.kpiScores.forEach(kpi=>{

        total += Number(kpi.score);

    });

    return Number(

        (

            total /

            employee.kpiScores.length

        ).toFixed(1)

    );

};


/*==========================================================
RESET KPI SCORES
==========================================================*/

EmployeeManager.resetKPIs = function(employeeID){

    const employee = this.getEmployeeByID(employeeID);

    if(!employee){

        return false;

    }

    employee.kpiScores.forEach(kpi=>{

        kpi.score = 0;

        kpi.remarks = "";

    });

    employee.averageKPI = 0;

    employee.lastUpdated = new Date();

    this.updateDepartmentStatistics();

    return true;

};


/*==========================================================
GET KPI DETAILS
==========================================================*/

EmployeeManager.getKPIs = function(employeeID){

    const employee = this.getEmployeeByID(employeeID);

    if(!employee){

        return [];

    }

    return employee.kpiScores;

};
/*==========================================================
AUTOMATIC EFFICIENCY ENGINE
==========================================================*/

EmployeeManager.calculateEfficiency = function(employee){

    if(!employee){

        return 0;

    }

    /*--------------------------------------------
    KPI WEIGHTAGE (70%)
    ---------------------------------------------*/

    const kpiScore = Number(employee.averageKPI || 0);

    /*--------------------------------------------
    MANAGER REMARK SCORE (30%)
    ---------------------------------------------*/

    let managerScore = 80;

    const remarks = (

        employee.managerRemarks ||

        ""

    ).toLowerCase();

    if(

        remarks.includes("excellent")

    ){

        managerScore = 100;

    }

    else if(

        remarks.includes("very good")

    ){

        managerScore = 90;

    }

    else if(

        remarks.includes("good")

    ){

        managerScore = 80;

    }

    else if(

        remarks.includes("average")

    ){

        managerScore = 65;

    }

    else if(

        remarks.includes("poor")

    ){

        managerScore = 40;

    }

    else if(

        remarks.includes("critical")

    ){

        managerScore = 20;

    }

    /*--------------------------------------------
    FINAL EFFICIENCY
    ---------------------------------------------*/

    const efficiency =

        (

            (kpiScore * 0.70)

            +

            (managerScore * 0.30)

        );

    employee.efficiencyScore =

        Number(

            efficiency.toFixed(1)

        );

    employee.performanceRating =

        this.getPerformanceRating(

            employee.efficiencyScore

        );

    return employee.efficiencyScore;

};


/*==========================================================
PERFORMANCE RATING
==========================================================*/

EmployeeManager.getPerformanceRating = function(score){

    if(score>=95){

        return "Outstanding";

    }

    if(score>=85){

        return "Excellent";

    }

    if(score>=75){

        return "Very Good";

    }

    if(score>=65){

        return "Good";

    }

    if(score>=50){

        return "Average";

    }

    return "Needs Improvement";

};


/*==========================================================
UPDATE MANAGER REMARKS
==========================================================*/

EmployeeManager.updateManagerRemarks=function(

    employeeID,

    remarks

){

    const employee=this.getEmployeeByID(employeeID);

    if(!employee){

        return false;

    }

    employee.managerRemarks=remarks;

    employee.lastUpdated=new Date();

    this.calculateEfficiency(employee);

    this.updateDepartmentStatistics();

    return true;

};


/*==========================================================
REFRESH ALL EMPLOYEE EFFICIENCY
==========================================================*/

EmployeeManager.refreshEfficiencyScores=function(){

    EmployeeDatabase.employees.forEach(employee=>{

        this.calculateEfficiency(employee);

    });

    this.updateDepartmentStatistics();

};
/*==========================================================
PROMOTION & DEPLOYMENT DECISION ENGINE
==========================================================*/

EmployeeManager.evaluateEmployee = function(employee){

    if(!employee){

        return;

    }

    /*======================================================
    PROMOTION READINESS
    ======================================================*/

    employee.promotionReady =

        employee.averageKPI >= 85 &&

        employee.efficiencyScore >= 85 &&

        employee.status === "Active";

    /*======================================================
    DEPLOYMENT READINESS
    ======================================================*/

    employee.readyForDeployment =

        employee.averageKPI >= 75 &&

        employee.efficiencyScore >= 75 &&

        employee.status === "Active";

    /*======================================================
    DEPLOYMENT RECOMMENDATION
    ======================================================*/

    if(

        employee.readyForDeployment

    ){

        employee.deploymentRecommendation =

            "Ready for Deployment";

    }

    else if(

        employee.efficiencyScore >= 60

    ){

        employee.deploymentRecommendation =

            "Deploy after Review";

    }

    else{

        employee.deploymentRecommendation =

            "Not Recommended";

    }

    /*======================================================
    RECALL RECOMMENDATION
    ======================================================*/

    if(

        employee.efficiencyScore < 50

    ){

        employee.recallRecommendation =

            "Recall Immediately";

    }

    else if(

        employee.efficiencyScore < 65

    ){

        employee.recallRecommendation =

            "Monitor Performance";

    }

    else{

        employee.recallRecommendation =

            "No Recall Required";

    }

    /*======================================================
    RISK LEVEL
    ======================================================*/

    if(employee.efficiencyScore>=90){

        employee.riskLevel="Low";

    }

    else if(employee.efficiencyScore>=75){

        employee.riskLevel="Medium";

    }

    else if(employee.efficiencyScore>=60){

        employee.riskLevel="High";

    }

    else{

        employee.riskLevel="Critical";

    }

};


/*==========================================================
REFRESH ALL DECISIONS
==========================================================*/

EmployeeManager.refreshDecisionEngine=function(){

    EmployeeDatabase.employees.forEach(employee=>{

        this.calculateEfficiency(employee);

        this.evaluateEmployee(employee);

    });

};


/*==========================================================
PROMOTION READY LIST
==========================================================*/

EmployeeManager.getPromotionCandidates=function(){

    return EmployeeDatabase.employees.filter(

        employee=>employee.promotionReady===true

    );

};


/*==========================================================
DEPLOYMENT READY LIST
==========================================================*/

EmployeeManager.getDeploymentCandidates=function(){

    return EmployeeDatabase.employees.filter(

        employee=>employee.readyForDeployment===true

    );

};


/*==========================================================
HIGH RISK EMPLOYEES
==========================================================*/

EmployeeManager.getHighRiskEmployees=function(){

    return EmployeeDatabase.employees.filter(

        employee=>

        employee.riskLevel==="Critical" ||

        employee.riskLevel==="High"

    );

};


/*==========================================================
RECALL CANDIDATES
==========================================================*/

EmployeeManager.getRecallCandidates=function(){

    return EmployeeDatabase.employees.filter(

        employee=>

        employee.recallRecommendation===

        "Recall Immediately"

    );

};
/*==========================================================
NOTIFICATION ENGINE
==========================================================*/

EmployeeManager.addNotification = function (

    title,

    message,

    type = "info"

) {

    EmployeeDatabase.notifications.unshift({

        id: Date.now(),

        title: title,

        message: message,

        type: type,

        read: false,

        createdOn: new Date()

    });

};


/*==========================================================
MARK NOTIFICATION AS READ
==========================================================*/

EmployeeManager.markNotificationRead = function(id){

    const notification = EmployeeDatabase.notifications.find(

        item => item.id === id

    );

    if(notification){

        notification.read = true;

    }

};


/*==========================================================
CLEAR ALL NOTIFICATIONS
==========================================================*/

EmployeeManager.clearNotifications = function(){

    EmployeeDatabase.notifications = [];

};


/*==========================================================
GET ALL NOTIFICATIONS
==========================================================*/

EmployeeManager.getNotifications = function(){

    return EmployeeDatabase.notifications;

};


/*==========================================================
UNREAD NOTIFICATION COUNT
==========================================================*/

EmployeeManager.getUnreadNotificationCount = function(){

    return EmployeeDatabase.notifications.filter(

        item => item.read === false

    ).length;

};


/*==========================================================
SYSTEM ALERT CHECK
==========================================================*/

EmployeeManager.generateSystemNotifications = function(){

    /*--------------------------------------------
    Promotion Ready Employees
    ---------------------------------------------*/

    this.getPromotionCandidates().forEach(employee=>{

        this.addNotification(

            "Promotion Candidate",

            employee.employeeName +

            " is eligible for promotion.",

            "success"

        );

    });

    /*--------------------------------------------
    Deployment Ready Employees
    ---------------------------------------------*/

    this.getDeploymentCandidates().forEach(employee=>{

        this.addNotification(

            "Deployment Ready",

            employee.employeeName +

            " is ready for deployment.",

            "info"

        );

    });

    /*--------------------------------------------
    Recall Candidates
    ---------------------------------------------*/

    this.getRecallCandidates().forEach(employee=>{

        this.addNotification(

            "Recall Required",

            employee.employeeName +

            " requires immediate recall.",

            "warning"

        );

    });

    /*--------------------------------------------
    High Risk Employees
    ---------------------------------------------*/

    this.getHighRiskEmployees().forEach(employee=>{

        this.addNotification(

            "High Risk Employee",

            employee.employeeName +

            " requires performance review.",

            "danger"

        );

    });

};


/*==========================================================
REFRESH NOTIFICATIONS
==========================================================*/

EmployeeManager.refreshNotifications = function(){

    this.clearNotifications();

    this.generateSystemNotifications();

};
/*==========================================================
DATA PERSISTENCE ENGINE
==========================================================*/

const DATABASE_KEY = "SerenticaEmployeeDatabase";

/*==========================================================
SAVE DATABASE
==========================================================*/

EmployeeManager.saveDatabase = function () {

    try {

        localStorage.setItem(

            DATABASE_KEY,

            JSON.stringify(EmployeeDatabase)

        );

        console.log("Employee Database Saved Successfully.");

    }

    catch (error) {

        console.error(

            "Error Saving Database",

            error

        );

    }

};

/*==========================================================
LOAD DATABASE
==========================================================*/

EmployeeManager.loadDatabase = function () {

    try {

        const savedData = localStorage.getItem(

            DATABASE_KEY

        );

        if (!savedData) {

            console.log(

                "No Existing Database Found."

            );

            return;

        }

        const parsedData = JSON.parse(savedData);

        Object.assign(

            EmployeeDatabase,

            parsedData

        );

        console.log(

            "Employee Database Loaded Successfully."

        );

    }

    catch (error) {

        console.error(

            "Error Loading Database",

            error

        );

    }

};

/*==========================================================
RESET DATABASE
==========================================================*/

EmployeeManager.resetDatabase = function () {

    localStorage.removeItem(

        DATABASE_KEY

    );

    EmployeeDatabase.employees = [];

    EmployeeDatabase.notifications = [];

    EmployeeDatabase.deploymentHistory = [];

    EmployeeDatabase.recallHistory = [];

    this.updateDepartmentStatistics();

    console.log(

        "Database Reset Successfully."

    );

};

/*==========================================================
AUTO SAVE
==========================================================*/

EmployeeManager.autoSave = function () {

    this.saveDatabase();

};

/*==========================================================
AUTO LOAD
==========================================================*/

EmployeeManager.initializeDatabase = function () {

    this.loadDatabase();

    this.refreshDecisionEngine();

    this.refreshNotifications();

    this.updateDepartmentStatistics();

};

/*==========================================================
SAVE ON WINDOW CLOSE
==========================================================*/

window.addEventListener(

    "beforeunload",

    () => {

        EmployeeManager.autoSave();

    }

);

/*==========================================================
INITIALIZE SYSTEM
==========================================================*/

window.addEventListener(

    "load",

    () => {

        EmployeeManager.initializeDatabase();

    }

);
/*==========================================================
UTILITY & VALIDATION ENGINE
==========================================================*/

/*==========================================================
GENERATE EMPLOYEE ID
==========================================================*/

EmployeeManager.generateEmployeeID = function () {

    const count = EmployeeDatabase.employees.length + 1;

    return "SR" + String(count).padStart(5, "0");

};


/*==========================================================
CHECK EMPLOYEE EXISTS
==========================================================*/

EmployeeManager.employeeExists = function (employeeID) {

    return EmployeeDatabase.employees.some(

        employee => employee.employeeID === employeeID

    );

};


/*==========================================================
VALIDATE EMPLOYEE DATA
==========================================================*/

EmployeeManager.validateEmployee = function (employee) {

    if (!employee.employeeName) return false;

    if (!employee.department) return false;

    if (!employee.role) return false;

    return true;

};


/*==========================================================
EXPORT DATABASE
==========================================================*/

EmployeeManager.exportDatabase = function () {

    return JSON.stringify(

        EmployeeDatabase,

        null,

        2

    );

};


/*==========================================================
IMPORT DATABASE
==========================================================*/

EmployeeManager.importDatabase = function (jsonData) {

    try {

        const data = JSON.parse(jsonData);

        Object.assign(

            EmployeeDatabase,

            data

        );

        this.saveDatabase();

        this.refreshDecisionEngine();

        this.refreshNotifications();

        this.updateDepartmentStatistics();

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

};


/*==========================================================
GET DASHBOARD SUMMARY
==========================================================*/

EmployeeManager.getDashboardSummary = function () {

    return {

        totalEmployees:

            EmployeeDatabase.employees.length,

        deploymentReady:

            this.getDeploymentCandidates().length,

        promotionReady:

            this.getPromotionCandidates().length,

        recallRequired:

            this.getRecallCandidates().length,

        highRisk:

            this.getHighRiskEmployees().length,

        notifications:

            this.getUnreadNotificationCount()

    };

};


/*==========================================================
GET DEPARTMENT SUMMARY
==========================================================*/

EmployeeManager.getDepartmentSummary = function (departmentName) {

    return EmployeeDatabase.departments[departmentName];

};


/*==========================================================
SEARCH EMPLOYEES
==========================================================*/

EmployeeManager.searchEmployees = function (keyword) {

    keyword = keyword.toLowerCase();

    return EmployeeDatabase.employees.filter(employee =>

        employee.employeeName.toLowerCase().includes(keyword) ||

        employee.employeeID.toLowerCase().includes(keyword) ||

        employee.department.toLowerCase().includes(keyword) ||

        employee.role.toLowerCase().includes(keyword)

    );

};


/*==========================================================
SYSTEM READY
==========================================================*/

console.log(

    "Serentica Employee Database Loaded Successfully."

);

console.log(

    "Version : 1.0"

);

console.log(

    "Employee Database Engine Ready."

);
