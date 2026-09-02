/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
MASTER EMPLOYEE DATABASE
employeeData.js

VERSION : 2.0
PURPOSE :
Central employee master data layer for

Excel Upload
      ↓
Employee Master Database
      ↓
Employee / Organization / Deploy / Recall
      ↓
Future HRMS API Integration

IMPORTANT:
- Employee ID is the unique primary identifier.
- No employee records are hard-coded here.
- Excel import will be handled by excelImporter.js.
==========================================================*/

"use strict";


/*==========================================================
1. DATABASE CONFIGURATION
==========================================================*/

const DATABASE_KEY = "SerenticaEmployeeDatabase";

const DATABASE_VERSION = "2.0";


/*==========================================================
2. GLOBAL EMPLOYEE DATABASE
==========================================================*/

const EmployeeDatabase = {

    version: DATABASE_VERSION,

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

    recallHistory: [],

    importHistory: []

};


/*==========================================================
3. ROLE MASTER
==========================================================*/

const RoleMaster = {

    "Cluster Head": {

        hierarchy: 1,

        reportingTo: null

    },

    "Project Manager": {

        hierarchy: 2,

        reportingTo: "Cluster Head"

    },

    "Department Head": {

        hierarchy: 3,

        reportingTo: "Project Manager"

    },

    "Team Lead": {

        hierarchy: 4,

        reportingTo: "Department Head"

    },

    "Engineer": {

        hierarchy: 5,

        reportingTo: "Team Lead"

    },

    "Supervisor": {

        hierarchy: 6,

        reportingTo: "Engineer"

    },

    "Technician": {

        hierarchy: 7,

        reportingTo: "Supervisor"

    },

    "Executive": {

        hierarchy: 5,

        reportingTo: "Team Lead"

    }

};


/*==========================================================
4. DEPARTMENT MASTER
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
5. INITIALIZE DEPARTMENTS
==========================================================*/

function initializeDepartments() {

    DepartmentMaster.forEach(department => {

        EmployeeDatabase.departments[department] = {

            name: department,

            employees: [],

            sanctionedStrength: 0,

            currentStrength: 0,

            vacancies: 0,

            averageKPI: 0,

            averageEfficiency: 0,

            deploymentReady: 0,

            departmentHealth: 0

        };

    });

}

initializeDepartments();


/*==========================================================
6. EMPLOYEE CLASS
==========================================================*/

class Employee {

    constructor(data = {}) {

        /*==================================================
        UNIQUE EMPLOYEE IDENTIFICATION
        ==================================================*/

        this.employeeID =
            String(data.employeeID || "").trim();

        this.employeeName =
            String(data.employeeName || "").trim();

        this.profilePhoto =
            data.profilePhoto ||
            "assets/images/profile.png";


        /*==================================================
        ORGANIZATIONAL INFORMATION
        ==================================================*/

        this.department =
            data.department || "";

        this.role =
            data.role || "";

        this.designation =
            data.designation || "";

        this.reportingManager =
            data.reportingManager || "";

        this.teamLead =
            data.teamLead || "";

        this.clusterHead =
            data.clusterHead || "";

        this.projectManager =
            data.projectManager || "";


        /*==================================================
        PERSONAL INFORMATION
        ==================================================*/

        this.email =
            data.email || "";

        this.phone =
            data.phone || "";

        this.gender =
            data.gender || "";

        this.dateOfBirth =
            data.dateOfBirth || "";

        this.bloodGroup =
            data.bloodGroup || "";

        this.address =
            data.address || "";

        this.emergencyContact =
            data.emergencyContact || "";


        /*==================================================
        EMPLOYMENT INFORMATION
        ==================================================*/

        this.company =
            data.company ||
            "Serentica Renewables";

        this.currentSite =
            data.currentSite ||
            "Koppal";

        this.currentProject =
            data.currentProject || "";

        this.employmentType =
            data.employmentType || "";

        this.dateOfJoining =
            data.dateOfJoining || "";

        this.experience =
            Number(data.experience || 0);

        this.noticePeriod =
            data.noticePeriod || "";

        this.status =
            data.status ||
            "Active";


        /*==================================================
        ROLE INFORMATION
        ==================================================*/

        this.roleHierarchy =
            Number(data.roleHierarchy || 0);

        this.jobDescription =
            data.jobDescription || "";

        this.roleKPIs =
            Array.isArray(data.roleKPIs)
                ? data.roleKPIs
                : [];

        this.currentTasks =
            Array.isArray(data.currentTasks)
                ? data.currentTasks
                : [];


        /*==================================================
        DEPLOYMENT INFORMATION
        ==================================================*/

        this.deploymentStatus =
            data.deploymentStatus ||
            "Not Deployed";

        this.readyForDeployment =
            Boolean(data.readyForDeployment);

        this.deploymentRecommendation =
            data.deploymentRecommendation ||
            "Pending";

        this.lastDeployment =
            data.lastDeployment || "";

        this.lastRecall =
            data.lastRecall || "";

        this.deploymentHistory =
            Array.isArray(data.deploymentHistory)
                ? data.deploymentHistory
                : [];

        this.recallHistory =
            Array.isArray(data.recallHistory)
                ? data.recallHistory
                : [];


        /*==================================================
        PERFORMANCE INFORMATION
        ==================================================*/

        this.kpiScores =
            Array.isArray(data.kpiScores)
                ? data.kpiScores
                : [];

        this.averageKPI =
            Number(data.averageKPI || 0);

        this.efficiencyScore =
            Number(data.efficiencyScore || 0);

        this.performanceRating =
            data.performanceRating || "";

        this.managerRemarks =
            data.managerRemarks || "";

        this.teamLeadRemarks =
            data.teamLeadRemarks || "";

        this.clusterRemarks =
            data.clusterRemarks || "";


        /*==================================================
        TRAINING
        ==================================================*/

        this.trainingRequired =
            Array.isArray(data.trainingRequired)
                ? data.trainingRequired
                : [];

        this.completedTraining =
            Array.isArray(data.completedTraining)
                ? data.completedTraining
                : [];

        this.certifications =
            Array.isArray(data.certifications)
                ? data.certifications
                : [];


        /*==================================================
        SUCCESSION & RISK
        ==================================================*/

        this.promotionReady =
            Boolean(data.promotionReady);

        this.successorFor =
            data.successorFor || "";

        this.riskLevel =
            data.riskLevel || "Low";

        this.recallRecommendation =
            data.recallRecommendation ||
            "No Recall Required";


        /*==================================================
        SYSTEM INFORMATION
        ==================================================*/

        this.createdDate =
            data.createdDate ||
            new Date().toISOString();

        this.lastUpdated =
            data.lastUpdated ||
            new Date().toISOString();

    }

}


/*==========================================================
7. EMPLOYEE DATABASE MANAGER
==========================================================*/

const EmployeeManager = {


    /*======================================================
    ADD OR UPDATE EMPLOYEE

    UNIQUE KEY:
    employeeID
    ======================================================*/

    addEmployee(employeeData) {

        if (!employeeData) {

            console.error(
                "Employee data is missing."
            );

            return false;

        }


        const employeeID =
            String(
                employeeData.employeeID || ""
            ).trim();


        if (!employeeID) {

            console.error(
                "Employee ID is required."
            );

            return false;

        }


        const existingEmployee =
            this.getEmployeeByID(employeeID);


        /*==================================================
        UPDATE EXISTING EMPLOYEE
        ==================================================*/

        if (existingEmployee) {

            Object.assign(
                existingEmployee,
                employeeData
            );

            existingEmployee.lastUpdated =
                new Date().toISOString();

            this.applyRoleTemplate(
                existingEmployee
            );

            this.updateReportingHierarchy(
                existingEmployee
            );

            this.initializeKPIs(
                existingEmployee
            );

            this.updateDepartmentStatistics();

            return existingEmployee;

        }


        /*==================================================
        CREATE NEW EMPLOYEE
        ==================================================*/

        const employee =
            new Employee(employeeData);


        this.applyRoleTemplate(employee);

        this.updateReportingHierarchy(employee);

        this.initializeKPIs(employee);


        EmployeeDatabase.employees.push(
            employee
        );


        this.updateDepartmentStatistics();


        return employee;

    },


    /*======================================================
    BULK ADD / UPDATE

    USED BY FUTURE EXCEL IMPORTER
    ======================================================*/

    bulkAddEmployees(employeeList = []) {

        if (!Array.isArray(employeeList)) {

            return {

                added: 0,

                updated: 0,

                failed: 0

            };

        }


        let added = 0;

        let updated = 0;

        let failed = 0;


        employeeList.forEach(data => {

            try {

                if (!data || !data.employeeID) {

                    failed++;

                    return;

                }


                const existing =
                    this.getEmployeeByID(
                        String(data.employeeID).trim()
                    );


                this.addEmployee(data);


                if (existing) {

                    updated++;

                }

                else {

                    added++;

                }

            }

            catch (error) {

                failed++;

                console.error(
                    "Employee import error:",
                    error
                );

            }

        });


        this.updateDepartmentStatistics();

        this.saveDatabase();


        return {

            added: added,

            updated: updated,

            failed: failed,

            totalProcessed:
                added + updated + failed

        };

    },


    /*======================================================
    UPDATE EMPLOYEE
    ======================================================*/

    updateEmployee(
        employeeID,
        updatedData = {}
    ) {

        const employee =
            this.getEmployeeByID(employeeID);


        if (!employee) {

            return false;

        }


        Object.assign(
            employee,
            updatedData
        );


        employee.lastUpdated =
            new Date().toISOString();


        this.applyRoleTemplate(employee);

        this.updateReportingHierarchy(employee);

        this.updateDepartmentStatistics();


        return true;

    },


    /*======================================================
    DELETE EMPLOYEE
    ======================================================*/

    deleteEmployee(employeeID) {

        const index =
            EmployeeDatabase.employees.findIndex(
                employee =>
                    employee.employeeID ===
                    employeeID
            );


        if (index === -1) {

            return false;

        }


        EmployeeDatabase.employees.splice(
            index,
            1
        );


        this.updateDepartmentStatistics();

        this.saveDatabase();


        return true;

    },


    /*======================================================
    GET EMPLOYEE BY UNIQUE ID
    ======================================================*/

    getEmployeeByID(employeeID) {

        const id =
            String(employeeID || "").trim();


        return EmployeeDatabase.employees.find(
            employee =>
                employee.employeeID === id
        );

    },


    /*======================================================
    GET EMPLOYEE BY NAME
    ======================================================*/

    getEmployeeByName(employeeName) {

        const name =
            String(employeeName || "")
                .trim()
                .toLowerCase();


        return EmployeeDatabase.employees.find(
            employee =>
                employee.employeeName
                    .toLowerCase() === name
        );

    },


    /*======================================================
    GET EMPLOYEES BY DEPARTMENT
    ======================================================*/

    getEmployeesByDepartment(department) {

        return EmployeeDatabase.employees.filter(
            employee =>
                employee.department === department
        );

    },


    /*======================================================
    GET EMPLOYEES BY ROLE
    ======================================================*/

    getEmployeesByRole(role) {

        return EmployeeDatabase.employees.filter(
            employee =>
                employee.role === role
        );

    },


    /*======================================================
    GET EMPLOYEES BY REPORTING MANAGER
    ======================================================*/

    getEmployeesByReportingManager(
        managerName
    ) {

        return EmployeeDatabase.employees.filter(
            employee =>
                employee.reportingManager ===
                managerName
        );

    },


    /*======================================================
    GET DEPLOYMENT READY EMPLOYEES
    ======================================================*/

    getDeploymentReadyEmployees() {

        return EmployeeDatabase.employees.filter(
            employee =>
                employee.readyForDeployment === true
        );

    },


    /*======================================================
    GET PROMOTION READY EMPLOYEES
    ======================================================*/

    getPromotionReadyEmployees() {

        return EmployeeDatabase.employees.filter(
            employee =>
                employee.promotionReady === true
        );

    },


    /*======================================================
    GET ACTIVE EMPLOYEES
    ======================================================*/

    getActiveEmployees() {

        return EmployeeDatabase.employees.filter(
            employee =>
                employee.status === "Active"
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
8. DEPARTMENT STATISTICS ENGINE
==========================================================*/

EmployeeManager.updateDepartmentStatistics =
function () {


    Object.values(
        EmployeeDatabase.departments
    ).forEach(department => {

        department.employees = [];

        department.currentStrength = 0;

        department.averageKPI = 0;

        department.averageEfficiency = 0;

        department.deploymentReady = 0;

        department.vacancies = 0;

        department.departmentHealth = 0;

    });


    EmployeeDatabase.employees.forEach(
        employee => {

            const department =
                EmployeeDatabase
                    .departments[
                        employee.department
                    ];


            if (!department) {

                return;

            }


            department.employees.push(
                employee
            );

        }
    );


    Object.values(
        EmployeeDatabase.departments
    ).forEach(department => {

        department.currentStrength =
            department.employees.length;


        if (department.currentStrength === 0) {

            department.averageKPI = 0;

            department.averageEfficiency = 0;

        }

        else {

            const totalKPI =
                department.employees.reduce(
                    (total, employee) =>
                        total +
                        Number(
                            employee.averageKPI || 0
                        ),
                    0
                );


            const totalEfficiency =
                department.employees.reduce(
                    (total, employee) =>
                        total +
                        Number(
                            employee.efficiencyScore || 0
                        ),
                    0
                );


            department.averageKPI =
                Number(
                    (
                        totalKPI /
                        department.currentStrength
                    ).toFixed(1)
                );


            department.averageEfficiency =
                Number(
                    (
                        totalEfficiency /
                        department.currentStrength
                    ).toFixed(1)
                );

        }


        department.deploymentReady =
            department.employees.filter(
                employee =>
                    employee.readyForDeployment === true
            ).length;


        department.vacancies =
            Math.max(
                0,
                department.sanctionedStrength -
                department.currentStrength
            );


        department.departmentHealth =
            EmployeeManager.calculateDepartmentHealth(
                department
            );

    });

};


/*==========================================================
9. DEPARTMENT HEALTH ENGINE
==========================================================*/

EmployeeManager.calculateDepartmentHealth =
function (department) {


    if (
        !department ||
        department.currentStrength === 0
    ) {

        return 0;

    }


    const kpiScore =
        Number(
            department.averageKPI || 0
        );


    const efficiencyScore =
        Number(
            department.averageEfficiency || 0
        );


    let vacancyScore = 100;


    if (
        department.sanctionedStrength > 0
    ) {

        const vacancyPercentage =
            (
                department.vacancies /
                department.sanctionedStrength
            ) * 100;


        vacancyScore =
            Math.max(
                0,
                100 - vacancyPercentage
            );

    }


    let deploymentScore = 100;


    if (department.currentStrength > 0) {

        deploymentScore =
            (
                department.deploymentReady /
                department.currentStrength
            ) * 100;

    }


    let criticalRoleScore = 100;


    const hasLead =
        department.employees.some(
            employee =>
                employee.role ===
                    "Department Head" ||
                employee.role ===
                    "Team Lead"
        );


    if (!hasLead) {

        criticalRoleScore = 40;

    }


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
10. HEALTH STATUS
==========================================================*/

EmployeeManager.getHealthStatus =
function (score) {

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
11. HEALTH COLOR
==========================================================*/

EmployeeManager.getHealthColor =
function (score) {

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
12. ROLE TEMPLATE MASTER
==========================================================*/

EmployeeDatabase.roleTemplates = {

    "Cluster Head": {

        jobDescription:
            "Overall site leadership, operational excellence, strategic planning, manpower optimization and stakeholder management.",

        kpis: [

            "Overall Site Performance",

            "Project Delivery",

            "Safety Compliance",

            "Budget Control",

            "Resource Utilisation"

        ]

    },


    "Project Manager": {

        jobDescription:
            "Responsible for complete project execution, planning, quality, manpower deployment and client coordination.",

        kpis: [

            "Project Progress",

            "Schedule Adherence",

            "Cost Performance",

            "Quality Compliance",

            "Safety Performance"

        ]

    },


    "Department Head": {

        jobDescription:
            "Leads departmental execution, manpower allocation, technical coordination and performance monitoring.",

        kpis: [

            "Department Productivity",

            "Resource Utilisation",

            "Team Performance",

            "Quality",

            "Safety"

        ]

    },


    "Team Lead": {

        jobDescription:
            "Coordinates daily activities, allocates work, monitors engineers and ensures timely execution.",

        kpis: [

            "Task Completion",

            "Team Productivity",

            "Planning",

            "Quality",

            "Safety"

        ]

    },


    "Engineer": {

        jobDescription:
            "Responsible for execution, monitoring, reporting, quality and technical support.",

        kpis: [

            "Daily Productivity",

            "Quality Compliance",

            "Documentation",

            "Technical Accuracy",

            "Safety"

        ]

    },


    "Supervisor": {

        jobDescription:
            "Supervises field execution, workforce management and adherence to site procedures.",

        kpis: [

            "Daily Output",

            "Labour Productivity",

            "Quality",

            "Safety",

            "Attendance"

        ]

    },


    "Technician": {

        jobDescription:
            "Performs installation, maintenance, inspection and technical activities.",

        kpis: [

            "Work Completion",

            "Technical Accuracy",

            "Equipment Care",

            "Safety",

            "Attendance"

        ]

    },


    "Executive": {

        jobDescription:
            "Supports departmental activities, reporting, documentation and coordination.",

        kpis: [

            "Documentation",

            "Task Completion",

            "Coordination",

            "Accuracy",

            "Timeliness"

        ]

    }

};


/*==========================================================
13. APPLY ROLE TEMPLATE
==========================================================*/

EmployeeManager.applyRoleTemplate =
function (employee) {

    if (!employee) {

        return employee;

    }


    const template =
        EmployeeDatabase.roleTemplates[
            employee.role
        ];


    if (!template) {

        return employee;

    }


    employee.jobDescription =
        template.jobDescription;


    employee.roleKPIs =
        [...template.kpis];


    return employee;

};


/*==========================================================
14. ROLE ASSIGNMENT
==========================================================*/

EmployeeManager.assignRole =
function (employeeID, role) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return false;

    }


    if (!RoleMaster[role]) {

        console.error(
            "Invalid role:",
            role
        );

        return false;

    }


    employee.role = role;


    this.applyRoleTemplate(employee);

    this.updateReportingHierarchy(employee);

    this.initializeKPIs(employee);

    this.updateDepartmentStatistics();


    return true;

};


/*==========================================================
15. REPORTING HIERARCHY
==========================================================*/

EmployeeManager.updateReportingHierarchy =
function (employee) {

    if (!employee) {

        return;

    }


    const hierarchy =
        RoleMaster[employee.role];


    if (!hierarchy) {

        return;

    }


    employee.roleHierarchy =
        hierarchy.hierarchy;

};


/*==========================================================
16. REPORTING MANAGER
==========================================================*/

EmployeeManager.changeReportingManager =
function (
    employeeID,
    managerName
) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return false;

    }


    employee.reportingManager =
        managerName || "";


    employee.lastUpdated =
        new Date().toISOString();


    return true;

};


/*==========================================================
17. TEAM LEAD
==========================================================*/

EmployeeManager.changeTeamLead =
function (
    employeeID,
    teamLead
) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return false;

    }


    employee.teamLead =
        teamLead || "";


    employee.lastUpdated =
        new Date().toISOString();


    return true;

};


/*==========================================================
18. DEPARTMENT TRANSFER
==========================================================*/

EmployeeManager.transferDepartment =
function (
    employeeID,
    newDepartment
) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return false;

    }


    if (
        !EmployeeDatabase.departments[
            newDepartment
        ]
    ) {

        console.error(
            "Invalid department:",
            newDepartment
        );

        return false;

    }


    employee.department =
        newDepartment;


    employee.lastUpdated =
        new Date().toISOString();


    this.updateDepartmentStatistics();


    return true;

};


/*==========================================================
19. KPI INITIALIZATION
==========================================================*/

EmployeeManager.initializeKPIs =
function (employee) {

    if (!employee) {

        return;

    }


    if (
        !employee.roleKPIs ||
        employee.roleKPIs.length === 0
    ) {

        this.applyRoleTemplate(employee);

    }


    if (
        !employee.kpiScores ||
        employee.kpiScores.length === 0
    ) {

        employee.kpiScores =
            employee.roleKPIs.map(kpi => ({

                name: kpi,

                score: 0,

                remarks: ""

            }));

    }

};


/*==========================================================
20. UPDATE KPI SCORE
==========================================================*/

EmployeeManager.updateKPIScore =
function (
    employeeID,
    kpiName,
    score,
    remarks = ""
) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return false;

    }


    this.initializeKPIs(employee);


    const kpi =
        employee.kpiScores.find(
            item =>
                item.name === kpiName
        );


    if (!kpi) {

        return false;

    }


    const numericScore =
        Number(score);


    if (
        Number.isNaN(numericScore) ||
        numericScore < 0 ||
        numericScore > 100
    ) {

        return false;

    }


    kpi.score =
        numericScore;

    kpi.remarks =
        remarks;


    employee.averageKPI =
        this.calculateAverageKPI(employee);


    employee.lastUpdated =
        new Date().toISOString();


    this.updateDepartmentStatistics();


    return true;

};


/*==========================================================
21. CALCULATE AVERAGE KPI
==========================================================*/

EmployeeManager.calculateAverageKPI =
function (employee) {

    if (
        !employee ||
        !employee.kpiScores ||
        employee.kpiScores.length === 0
    ) {

        return 0;

    }


    const total =
        employee.kpiScores.reduce(
            (sum, kpi) =>
                sum +
                Number(kpi.score || 0),
            0
        );


    return Number(
        (
            total /
            employee.kpiScores.length
        ).toFixed(1)
    );

};


/*==========================================================
22. RESET KPIs
==========================================================*/

EmployeeManager.resetKPIs =
function (employeeID) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return false;

    }


    this.initializeKPIs(employee);


    employee.kpiScores.forEach(kpi => {

        kpi.score = 0;

        kpi.remarks = "";

    });


    employee.averageKPI = 0;


    employee.lastUpdated =
        new Date().toISOString();


    this.updateDepartmentStatistics();


    return true;

};


/*==========================================================
23. GET KPI DETAILS
==========================================================*/

EmployeeManager.getKPIs =
function (employeeID) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return [];

    }


    return employee.kpiScores || [];

};


/*==========================================================
24. EFFICIENCY ENGINE
==========================================================*/

EmployeeManager.calculateEfficiency =
function (employee) {

    if (!employee) {

        return 0;

    }


    const kpiScore =
        Number(
            employee.averageKPI || 0
        );


    let managerScore = 80;


    const remarks =
        String(
            employee.managerRemarks || ""
        ).toLowerCase();


    if (remarks.includes("excellent")) {

        managerScore = 100;

    }

    else if (
        remarks.includes("very good")
    ) {

        managerScore = 90;

    }

    else if (
        remarks.includes("good")
    ) {

        managerScore = 80;

    }

    else if (
        remarks.includes("average")
    ) {

        managerScore = 65;

    }

    else if (
        remarks.includes("poor")
    ) {

        managerScore = 40;

    }

    else if (
        remarks.includes("critical")
    ) {

        managerScore = 20;

    }


    const efficiency =
        (
            (kpiScore * 0.70) +
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
25. PERFORMANCE RATING
==========================================================*/

EmployeeManager.getPerformanceRating =
function (score) {

    if (score >= 95) {

        return "Outstanding";

    }

    if (score >= 85) {

        return "Excellent";

    }

    if (score >= 75) {

        return "Very Good";

    }

    if (score >= 65) {

        return "Good";

    }

    if (score >= 50) {

        return "Average";

    }

    return "Needs Improvement";

};


/*==========================================================
26. MANAGER REMARKS
==========================================================*/

EmployeeManager.updateManagerRemarks =
function (
    employeeID,
    remarks
) {

    const employee =
        this.getEmployeeByID(employeeID);


    if (!employee) {

        return false;

    }


    employee.managerRemarks =
        remarks || "";


    employee.lastUpdated =
        new Date().toISOString();


    this.calculateEfficiency(employee);

    this.updateDepartmentStatistics();


    return true;

};


/*==========================================================
27. REFRESH EFFICIENCY
==========================================================*/

EmployeeManager.refreshEfficiencyScores =
function () {

    EmployeeDatabase.employees.forEach(
        employee => {

            this.calculateEfficiency(
                employee
            );

        }
    );


    this.updateDepartmentStatistics();

};


/*==========================================================
28. DECISION ENGINE
==========================================================*/

EmployeeManager.evaluateEmployee =
function (employee) {

    if (!employee) {

        return;

    }


    /*======================================================
    PROMOTION
    ======================================================*/

    employee.promotionReady =

        employee.averageKPI >= 85 &&

        employee.efficiencyScore >= 85 &&

        employee.status === "Active";


    /*======================================================
    DEPLOYMENT
    ======================================================*/

    employee.readyForDeployment =

        employee.averageKPI >= 75 &&

        employee.efficiencyScore >= 75 &&

        employee.status === "Active";


    /*======================================================
    DEPLOYMENT RECOMMENDATION
    ======================================================*/

    if (employee.readyForDeployment) {

        employee.deploymentRecommendation =
            "Ready for Deployment";

    }

    else if (
        employee.efficiencyScore >= 60
    ) {

        employee.deploymentRecommendation =
            "Deploy after Review";

    }

    else {

        employee.deploymentRecommendation =
            "Not Recommended";

    }


    /*======================================================
    RECALL
    ======================================================*/

    if (
        employee.efficiencyScore < 50
    ) {

        employee.recallRecommendation =
            "Recall Immediately";

    }

    else if (
        employee.efficiencyScore < 65
    ) {

        employee.recallRecommendation =
            "Monitor Performance";

    }

    else {

        employee.recallRecommendation =
            "No Recall Required";

    }


    /*======================================================
    RISK
    ======================================================*/

    if (
        employee.efficiencyScore >= 90
    ) {

        employee.riskLevel = "Low";

    }

    else if (
        employee.efficiencyScore >= 75
    ) {

        employee.riskLevel = "Medium";

    }

    else if (
        employee.efficiencyScore >= 60
    ) {

        employee.riskLevel = "High";

    }

    else {

        employee.riskLevel = "Critical";

    }

};


/*==========================================================
29. REFRESH DECISION ENGINE
==========================================================*/

EmployeeManager.refreshDecisionEngine =
function () {

    EmployeeDatabase.employees.forEach(
        employee => {

            this.calculateEfficiency(
                employee
            );

            this.evaluateEmployee(
                employee
            );

        }
    );

};


/*==========================================================
30. DECISION LISTS
==========================================================*/

EmployeeManager.getPromotionCandidates =
function () {

    return EmployeeDatabase.employees.filter(
        employee =>
            employee.promotionReady === true
    );

};


EmployeeManager.getDeploymentCandidates =
function () {

    return EmployeeDatabase.employees.filter(
        employee =>
            employee.readyForDeployment === true
    );

};


EmployeeManager.getHighRiskEmployees =
function () {

    return EmployeeDatabase.employees.filter(
        employee =>
            employee.riskLevel === "Critical" ||
            employee.riskLevel === "High"
    );

};


EmployeeManager.getRecallCandidates =
function () {

    return EmployeeDatabase.employees.filter(
        employee =>
            employee.recallRecommendation ===
            "Recall Immediately"
    );

};


/*==========================================================
31. NOTIFICATION ENGINE
==========================================================*/

EmployeeManager.addNotification =
function (
    title,
    message,
    type = "info"
) {

    EmployeeDatabase.notifications.unshift({

        id:
            Date.now() +
            Math.random(),

        title:
            title,

        message:
            message,

        type:
            type,

        read:
            false,

        createdOn:
            new Date().toISOString()

    });

};


/*==========================================================
32. NOTIFICATION MANAGEMENT
==========================================================*/

EmployeeManager.markNotificationRead =
function (id) {

    const notification =
        EmployeeDatabase.notifications.find(
            item =>
                item.id === id
        );


    if (notification) {

        notification.read = true;

    }

};


EmployeeManager.clearNotifications =
function () {

    EmployeeDatabase.notifications = [];

};


EmployeeManager.getNotifications =
function () {

    return EmployeeDatabase.notifications;

};


EmployeeManager.getUnreadNotificationCount =
function () {

    return EmployeeDatabase.notifications.filter(
        item =>
            item.read === false
    ).length;

};


/*==========================================================
33. SYSTEM NOTIFICATIONS
==========================================================*/

EmployeeManager.generateSystemNotifications =
function () {

    this.getPromotionCandidates()
        .forEach(employee => {

            this.addNotification(

                "Promotion Candidate",

                employee.employeeName +
                " is eligible for promotion.",

                "success"

            );

        });


    this.getDeploymentCandidates()
        .forEach(employee => {

            this.addNotification(

                "Deployment Ready",

                employee.employeeName +
                " is ready for deployment.",

                "info"

            );

        });


    this.getRecallCandidates()
        .forEach(employee => {

            this.addNotification(

                "Recall Required",

                employee.employeeName +
                " requires immediate recall.",

                "warning"

            );

        });


    this.getHighRiskEmployees()
        .forEach(employee => {

            this.addNotification(

                "High Risk Employee",

                employee.employeeName +
                " requires performance review.",

                "danger"

            );

        });

};


/*==========================================================
34. REFRESH NOTIFICATIONS
==========================================================*/

EmployeeManager.refreshNotifications =
function () {

    this.clearNotifications();

    this.generateSystemNotifications();

};


/*==========================================================
35. DATABASE SAVE
==========================================================*/

EmployeeManager.saveDatabase =
function () {

    try {

        localStorage.setItem(

            DATABASE_KEY,

            JSON.stringify(
                EmployeeDatabase
            )

        );


        console.log(
            "Employee Database Saved Successfully."
        );


        return true;

    }

    catch (error) {

        console.error(
            "Error Saving Employee Database:",
            error
        );


        return false;

    }

};


/*==========================================================
36. DATABASE LOAD
==========================================================*/

EmployeeManager.loadDatabase =
function () {

    try {

        const savedData =
            localStorage.getItem(
                DATABASE_KEY
            );


        if (!savedData) {

            console.log(
                "No Existing Employee Database Found."
            );

            return false;

        }


        const parsedData =
            JSON.parse(savedData);


        if (
            !parsedData ||
            !Array.isArray(
                parsedData.employees
            )
        ) {

            console.error(
                "Invalid Employee Database."
            );

            return false;

        }


        EmployeeDatabase.employees =
            parsedData.employees.map(
                data =>
                    new Employee(data)
            );


        EmployeeDatabase.site =
            parsedData.site ||
            EmployeeDatabase.site;


        EmployeeDatabase.notifications =
            Array.isArray(
                parsedData.notifications
            )
                ? parsedData.notifications
                : [];


        EmployeeDatabase.deploymentHistory =
            Array.isArray(
                parsedData.deploymentHistory
            )
                ? parsedData.deploymentHistory
                : [];


        EmployeeDatabase.recallHistory =
            Array.isArray(
                parsedData.recallHistory
            )
                ? parsedData.recallHistory
                : [];


        EmployeeDatabase.importHistory =
            Array.isArray(
                parsedData.importHistory
            )
                ? parsedData.importHistory
                : [];


        this.updateDepartmentStatistics();


        console.log(
            "Employee Database Loaded Successfully."
        );


        return true;

    }

    catch (error) {

        console.error(
            "Error Loading Employee Database:",
            error
        );


        return false;

    }

};


/*==========================================================
37. DATABASE RESET
==========================================================*/

EmployeeManager.resetDatabase =
function () {

    localStorage.removeItem(
        DATABASE_KEY
    );


    EmployeeDatabase.employees = [];

    EmployeeDatabase.notifications = [];

    EmployeeDatabase.deploymentHistory = [];

    EmployeeDatabase.recallHistory = [];

    EmployeeDatabase.importHistory = [];


    this.updateDepartmentStatistics();


    console.log(
        "Employee Database Reset Successfully."
    );

};


/*==========================================================
38. IMPORT DATABASE JSON
==========================================================*/

EmployeeManager.importDatabase =
function (jsonData) {

    try {

        const data =
            typeof jsonData === "string"
                ? JSON.parse(jsonData)
                : jsonData;


        if (
            !data ||
            !Array.isArray(
                data.employees
            )
        ) {

            return false;

        }


        EmployeeDatabase.employees =
            data.employees.map(
                employee =>
                    new Employee(employee)
            );


        EmployeeDatabase.site =
            data.site ||
            EmployeeDatabase.site;


        this.refreshDecisionEngine();

        this.refreshNotifications();

        this.updateDepartmentStatistics();

        this.saveDatabase();


        return true;

    }

    catch (error) {

        console.error(
            "Database Import Error:",
            error
        );


        return false;

    }

};


/*==========================================================
39. EXPORT DATABASE
==========================================================*/

EmployeeManager.exportDatabase =
function () {

    return JSON.stringify(

        EmployeeDatabase,

        null,

        2

    );

};


/*==========================================================
40. EMPLOYEE ID GENERATOR
==========================================================*/

EmployeeManager.generateEmployeeID =
function () {

    let number = 1;

    let generatedID;


    do {

        generatedID =
            "SR" +
            String(number)
                .padStart(5, "0");

        number++;

    }

    while (
        this.employeeExists(
            generatedID
        )
    );


    return generatedID;

};


/*==========================================================
41. EMPLOYEE EXISTS
==========================================================*/

EmployeeManager.employeeExists =
function (employeeID) {

    return Boolean(
        this.getEmployeeByID(
            employeeID
        )
    );

};


/*==========================================================
42. VALIDATE EMPLOYEE
==========================================================*/

EmployeeManager.validateEmployee =
function (employee) {

    if (!employee) {

        return {

            valid: false,

            errors: [
                "Employee data is missing."
            ]

        };

    }


    const errors = [];


    if (!employee.employeeID) {

        errors.push(
            "Employee ID is required."
        );

    }


    if (!employee.employeeName) {

        errors.push(
            "Employee Name is required."
        );

    }


    if (!employee.department) {

        errors.push(
            "Department is required."
        );

    }


    if (!employee.role) {

        errors.push(
            "Role is required."
        );

    }


    if (
        employee.department &&
        !EmployeeDatabase.departments[
            employee.department
        ]
    ) {

        errors.push(
            "Invalid department."
        );

    }


    if (
        employee.role &&
        !RoleMaster[
            employee.role
        ]
    ) {

        errors.push(
            "Invalid role."
        );

    }


    return {

        valid:
            errors.length === 0,

        errors:
            errors

    };

};


/*==========================================================
43. SEARCH EMPLOYEES
==========================================================*/

EmployeeManager.searchEmployees =
function (keyword = "") {

    const search =
        String(keyword)
            .trim()
            .toLowerCase();


    if (!search) {

        return EmployeeDatabase.employees;

    }


    return EmployeeDatabase.employees.filter(
        employee =>

            String(
                employee.employeeName || ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                employee.employeeID || ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                employee.department || ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                employee.role || ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                employee.designation || ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                employee.currentProject || ""
            )
                .toLowerCase()
                .includes(search)

    );

};


/*==========================================================
44. DASHBOARD SUMMARY
==========================================================*/

EmployeeManager.getDashboardSummary =
function () {

    return {

        totalEmployees:
            EmployeeDatabase.employees.length,

        activeEmployees:
            this.getActiveEmployees().length,

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
45. DEPARTMENT SUMMARY
==========================================================*/

EmployeeManager.getDepartmentSummary =
function (departmentName) {

    return (
        EmployeeDatabase
            .departments[
                departmentName
            ] || null
    );

};


/*==========================================================
46. IMPORT HISTORY
==========================================================*/

EmployeeManager.addImportHistory =
function (record = {}) {

    EmployeeDatabase.importHistory.unshift({

        id:
            Date.now(),

        fileName:
            record.fileName || "",

        sheetName:
            record.sheetName || "",

        totalRows:
            Number(record.totalRows || 0),

        added:
            Number(record.added || 0),

        updated:
            Number(record.updated || 0),

        failed:
            Number(record.failed || 0),

        importedOn:
            new Date().toISOString()

    });


    this.saveDatabase();

};


/*==========================================================
47. GET IMPORT HISTORY
==========================================================*/

EmployeeManager.getImportHistory =
function () {

    return EmployeeDatabase.importHistory;

};


/*==========================================================
48. AUTO SAVE
==========================================================*/

EmployeeManager.autoSave =
function () {

    this.saveDatabase();

};


/*==========================================================
49. INITIALIZE DATABASE
==========================================================*/

EmployeeManager.initializeDatabase =
function () {

    this.loadDatabase();

    this.refreshDecisionEngine();

    this.refreshNotifications();

    this.updateDepartmentStatistics();


    console.log(
        "Serentica Employee Database Initialized."
    );

};


/*==========================================================
50. GLOBAL ACCESS
==========================================================*/

/*
IMPORTANT:

Other JS files can access:

window.EmployeeDatabase
window.EmployeeManager
window.RoleMaster
window.DepartmentMaster
window.Employee

This also avoids problems with modules expecting
these objects globally.
*/

window.EmployeeDatabase =
    EmployeeDatabase;

window.EmployeeManager =
    EmployeeManager;

window.RoleMaster =
    RoleMaster;

window.DepartmentMaster =
    DepartmentMaster;

window.Employee =
    Employee;


/*==========================================================
51. INITIALIZE WHEN PAGE LOADS
==========================================================*/

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            EmployeeManager.initializeDatabase();

        },
        { once: true }
    );

}

else {

    EmployeeManager.initializeDatabase();

}


/*==========================================================
52. AUTO SAVE BEFORE PAGE CLOSE
==========================================================*/

window.addEventListener(
    "beforeunload",
    function () {

        EmployeeManager.autoSave();

    }
);


/*==========================================================
53. SYSTEM READY
==========================================================*/

console.log(
    "=========================================="
);

console.log(
    "Serentica Employee Database Loaded"
);

console.log(
    "Version:",
    DATABASE_VERSION
);

console.log(
    "Dynamic Employee Master: READY"
);

console.log(
    "Excel Import Compatibility: READY"
);

console.log(
    "Future HRMS Integration: READY"
);

console.log(
    "=========================================="
);
