/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
ADVANCED KPI ENGINE
kpiEngine.js
Version 1.0
==========================================================*/

"use strict";

/*==========================================================
KPI ENGINE
==========================================================*/

const KPIEngine = {

    monthlyHistory: {},

    quarterlyHistory: {},

    yearlyHistory: {},

    departmentAnalytics: {},

    employeeAnalytics: {}

};


/*==========================================================
KPI CONFIGURATION
==========================================================*/

KPIEngine.configuration = {

    excellent: 95,

    veryGood: 85,

    good: 75,

    average: 60,

    poor: 40

};


/*==========================================================
PERFORMANCE CATEGORIES
==========================================================*/

KPIEngine.performanceCategory = {

    Outstanding:{

        minimum:95,

        color:"#2ECC71"

    },

    Excellent:{

        minimum:85,

        color:"#27AE60"

    },

    "Very Good":{

        minimum:75,

        color:"#3498DB"

    },

    Good:{

        minimum:60,

        color:"#F1C40F"

    },

    Average:{

        minimum:40,

        color:"#E67E22"

    },

    Poor:{

        minimum:0,

        color:"#E74C3C"

    }

};


/*==========================================================
MONTHS
==========================================================*/

KPIEngine.months=[

"January",

"February",

"March",

"April",

"May",

"June",

"July",

"August",

"September",

"October",

"November",

"December"

];


/*==========================================================
QUARTERS
==========================================================*/

KPIEngine.quarters={

Q1:["January","February","March"],

Q2:["April","May","June"],

Q3:["July","August","September"],

Q4:["October","November","December"]

};


/*==========================================================
CURRENT PERIOD
==========================================================*/

KPIEngine.currentMonth=function(){

    return this.months[new Date().getMonth()];

};

KPIEngine.currentYear=function(){

    return new Date().getFullYear();

};

KPIEngine.currentQuarter=function(){

    const month=new Date().getMonth()+1;

    if(month<=3) return "Q1";

    if(month<=6) return "Q2";

    if(month<=9) return "Q3";

    return "Q4";

};


/*==========================================================
SYSTEM READY
==========================================================*/

console.log(

    "Advanced KPI Engine Loaded."

);
/*==========================================================
MONTHLY KPI TRACKING ENGINE
==========================================================*/

KPIEngine.initializeEmployeeHistory = function(employeeID){

    if(!this.monthlyHistory[employeeID]){

        this.monthlyHistory[employeeID]={};

    }

};


/*==========================================================
SAVE MONTHLY KPI
==========================================================*/

KPIEngine.saveMonthlyKPI=function(employeeID){

    const employee=EmployeeManager.getEmployeeByID(employeeID);

    if(!employee){

        return false;

    }

    this.initializeEmployeeHistory(employeeID);

    const year=this.currentYear();

    const month=this.currentMonth();

    if(!this.monthlyHistory[employeeID][year]){

        this.monthlyHistory[employeeID][year]={};

    }

    this.monthlyHistory[employeeID][year][month]={

        averageKPI:employee.averageKPI,

        efficiency:employee.efficiencyScore,

        performance:employee.performanceRating,

        department:employee.department,

        role:employee.role,

        capturedOn:new Date()

    };

    return true;

};


/*==========================================================
GET MONTHLY KPI
==========================================================*/

KPIEngine.getMonthlyKPI=function(

    employeeID,

    year,

    month

){

    if(

        !this.monthlyHistory[employeeID]

    ){

        return null;

    }

    if(

        !this.monthlyHistory[employeeID][year]

    ){

        return null;

    }

    return this.monthlyHistory[employeeID][year][month] || null;

};


/*==========================================================
GET COMPLETE KPI HISTORY
==========================================================*/

KPIEngine.getEmployeeHistory=function(employeeID){

    return this.monthlyHistory[employeeID] || {};

};


/*==========================================================
SAVE ALL EMPLOYEES
==========================================================*/

KPIEngine.captureCurrentMonth=function(){

    EmployeeDatabase.employees.forEach(employee=>{

        this.saveMonthlyKPI(

            employee.employeeID

        );

    });

};


/*==========================================================
GET CURRENT MONTH AVERAGE
==========================================================*/

KPIEngine.getCurrentMonthAverage=function(employeeID){

    const history=this.getMonthlyKPI(

        employeeID,

        this.currentYear(),

        this.currentMonth()

    );

    if(!history){

        return 0;

    }

    return history.averageKPI;

};


/*==========================================================
TOTAL MONTHS RECORDED
==========================================================*/

KPIEngine.totalMonthsRecorded=function(employeeID){

    const history=this.getEmployeeHistory(employeeID);

    let count=0;

    Object.values(history).forEach(year=>{

        count+=Object.keys(year).length;

    });

    return count;

};
/*==========================================================
KPI TREND ANALYSIS ENGINE
==========================================================*/

KPIEngine.calculateTrend = function(employeeID){

    const history = this.getEmployeeHistory(employeeID);

    const years = Object.keys(history).sort();

    if(years.length === 0){

        return {

            trend:"No Data",

            percentage:0,

            direction:"-"

        };

    }

    const latestYear = years[years.length-1];

    const months = Object.keys(history[latestYear]);

    if(months.length < 2){

        return {

            trend:"Insufficient Data",

            percentage:0,

            direction:"-"

        };

    }

    const lastMonth = months[months.length-1];

    const previousMonth = months[months.length-2];

    const current =

        history[latestYear][lastMonth].averageKPI;

    const previous =

        history[latestYear][previousMonth].averageKPI;

    const difference = current - previous;

    const percentage =

        previous===0

        ?0

        :Number(

            (

                (difference/previous)*100

            ).toFixed(1)

        );

    if(difference>0){

        return{

            trend:"Improving",

            percentage:percentage,

            direction:"▲"

        };

    }

    if(difference<0){

        return{

            trend:"Declining",

            percentage:Math.abs(percentage),

            direction:"▼"

        };

    }

    return{

        trend:"Stable",

        percentage:0,

        direction:"►"

    };

};


/*==========================================================
GET KPI GROWTH
==========================================================*/

KPIEngine.getGrowthPercentage=function(employeeID){

    return this.calculateTrend(employeeID).percentage;

};


/*==========================================================
IS KPI IMPROVING
==========================================================*/

KPIEngine.isImproving=function(employeeID){

    return this.calculateTrend(employeeID).trend==="Improving";

};


/*==========================================================
IS KPI DECLINING
==========================================================*/

KPIEngine.isDeclining=function(employeeID){

    return this.calculateTrend(employeeID).trend==="Declining";

};


/*==========================================================
GET TREND ICON
==========================================================*/

KPIEngine.getTrendIcon=function(employeeID){

    return this.calculateTrend(employeeID).direction;

};


/*==========================================================
GET TREND LABEL
==========================================================*/

KPIEngine.getTrendLabel=function(employeeID){

    return this.calculateTrend(employeeID).trend;

};


/*==========================================================
GET TREND COLOR
==========================================================*/

KPIEngine.getTrendColor=function(employeeID){

    const trend=this.calculateTrend(employeeID).trend;

    switch(trend){

        case "Improving":

            return "#2ECC71";

        case "Stable":

            return "#3498DB";

        case "Declining":

            return "#E74C3C";

        default:

            return "#95A5A6";

    }

};
/*==========================================================
DEPARTMENT KPI ANALYTICS ENGINE
==========================================================*/

KPIEngine.calculateDepartmentAnalytics = function () {

    this.departmentAnalytics = {};

    DepartmentMaster.forEach(departmentName => {

        const employees = EmployeeManager.getEmployeesByDepartment(departmentName);

        let totalKPI = 0;

        let totalEfficiency = 0;

        let highestKPI = 0;

        let lowestKPI = 100;

        let highestEmployee = null;

        let lowestEmployee = null;

        employees.forEach(employee => {

            const kpi = Number(employee.averageKPI || 0);

            const efficiency = Number(employee.efficiencyScore || 0);

            totalKPI += kpi;

            totalEfficiency += efficiency;

            if (kpi > highestKPI) {

                highestKPI = kpi;

                highestEmployee = employee.employeeName;

            }

            if (kpi < lowestKPI) {

                lowestKPI = kpi;

                lowestEmployee = employee.employeeName;

            }

        });

        this.departmentAnalytics[departmentName] = {

            department: departmentName,

            totalEmployees: employees.length,

            averageKPI:

                employees.length === 0

                    ? 0

                    : Number((totalKPI / employees.length).toFixed(1)),

            averageEfficiency:

                employees.length === 0

                    ? 0

                    : Number((totalEfficiency / employees.length).toFixed(1)),

            highestKPI: highestKPI,

            lowestKPI:

                employees.length === 0

                    ? 0

                    : lowestKPI,

            highestEmployee: highestEmployee,

            lowestEmployee: lowestEmployee

        };

    });

};


/*==========================================================
GET DEPARTMENT ANALYTICS
==========================================================*/

KPIEngine.getDepartmentAnalytics = function (departmentName) {

    return this.departmentAnalytics[departmentName] || null;

};


/*==========================================================
RANK DEPARTMENTS
==========================================================*/

KPIEngine.rankDepartments = function () {

    return Object.values(this.departmentAnalytics)

        .sort((a, b) =>

            b.averageKPI - a.averageKPI

        );

};


/*==========================================================
BEST PERFORMING DEPARTMENT
==========================================================*/

KPIEngine.getBestDepartment = function () {

    const ranking = this.rankDepartments();

    return ranking.length > 0

        ? ranking[0]

        : null;

};


/*==========================================================
LOWEST PERFORMING DEPARTMENT
==========================================================*/

KPIEngine.getLowestDepartment = function () {

    const ranking = this.rankDepartments();

    return ranking.length > 0

        ? ranking[ranking.length - 1]

        : null;

};


/*==========================================================
REFRESH ANALYTICS
==========================================================*/

KPIEngine.refreshDepartmentAnalytics = function () {

    this.calculateDepartmentAnalytics();

};
/*==========================================================
EXECUTIVE KPI DASHBOARD ENGINE
==========================================================*/

KPIEngine.calculateExecutiveDashboard = function () {

    const employees = EmployeeDatabase.employees;

    let totalKPI = 0;

    let totalEfficiency = 0;

    let excellent = 0;

    let veryGood = 0;

    let good = 0;

    let average = 0;

    let poor = 0;

    employees.forEach(employee => {

        const kpi = Number(employee.averageKPI || 0);

        const efficiency = Number(employee.efficiencyScore || 0);

        totalKPI += kpi;

        totalEfficiency += efficiency;

        if (kpi >= 95) {

            excellent++;

        }

        else if (kpi >= 85) {

            veryGood++;

        }

        else if (kpi >= 75) {

            good++;

        }

        else if (kpi >= 60) {

            average++;

        }

        else {

            poor++;

        }

    });

    KPIEngine.executiveDashboard = {

        totalEmployees: employees.length,

        averageKPI:

            employees.length === 0

                ? 0

                : Number(

                    (

                        totalKPI /

                        employees.length

                    ).toFixed(1)

                ),

        averageEfficiency:

            employees.length === 0

                ? 0

                : Number(

                    (

                        totalEfficiency /

                        employees.length

                    ).toFixed(1)

                ),

        excellentEmployees: excellent,

        veryGoodEmployees: veryGood,

        goodEmployees: good,

        averageEmployees: average,

        poorEmployees: poor

    };

};


/*==========================================================
TOP PERFORMERS
==========================================================*/

KPIEngine.getTopPerformers = function(limit = 10){

    return [...EmployeeDatabase.employees]

        .sort(

            (a,b)=>

            b.averageKPI-a.averageKPI

        )

        .slice(0,limit);

};


/*==========================================================
LOW PERFORMERS
==========================================================*/

KPIEngine.getLowPerformers=function(limit=10){

    return [...EmployeeDatabase.employees]

        .sort(

            (a,b)=>

            a.averageKPI-b.averageKPI

        )

        .slice(0,limit);

};


/*==========================================================
ORGANISATION KPI
==========================================================*/

KPIEngine.getOrganisationAverageKPI=function(){

    return KPIEngine.executiveDashboard.averageKPI;

};


/*==========================================================
ORGANISATION EFFICIENCY
==========================================================*/

KPIEngine.getOrganisationEfficiency=function(){

    return KPIEngine.executiveDashboard.averageEfficiency;

};


/*==========================================================
GET DASHBOARD DATA
==========================================================*/

KPIEngine.getDashboardData=function(){

    return KPIEngine.executiveDashboard;

};


/*==========================================================
REFRESH DASHBOARD
==========================================================*/

KPIEngine.refreshDashboard=function(){

    this.calculateExecutiveDashboard();

    this.refreshDepartmentAnalytics();

};


/*==========================================================
INITIALIZE DASHBOARD
==========================================================*/

KPIEngine.refreshDashboard();
/*==========================================================
QUARTERLY & YEARLY KPI ANALYTICS ENGINE
==========================================================*/

KPIEngine.calculateQuarterlyPerformance = function(employeeID, year, quarter){

    const history = this.getEmployeeHistory(employeeID);

    if(!history[year]){

        return null;

    }

    const months = this.quarters[quarter];

    let totalKPI = 0;

    let totalEfficiency = 0;

    let count = 0;

    months.forEach(month=>{

        if(history[year][month]){

            totalKPI += history[year][month].averageKPI;

            totalEfficiency += history[year][month].efficiency;

            count++;

        }

    });

    if(count===0){

        return null;

    }

    return{

        year:year,

        quarter:quarter,

        averageKPI:Number((totalKPI/count).toFixed(1)),

        averageEfficiency:Number((totalEfficiency/count).toFixed(1)),

        monthsRecorded:count

    };

};


/*==========================================================
YEARLY PERFORMANCE
==========================================================*/

KPIEngine.calculateYearlyPerformance = function(employeeID, year){

    const history = this.getEmployeeHistory(employeeID);

    if(!history[year]){

        return null;

    }

    let totalKPI = 0;

    let totalEfficiency = 0;

    let count = 0;

    Object.values(history[year]).forEach(record=>{

        totalKPI += record.averageKPI;

        totalEfficiency += record.efficiency;

        count++;

    });

    if(count===0){

        return null;

    }

    return{

        year:year,

        averageKPI:Number((totalKPI/count).toFixed(1)),

        averageEfficiency:Number((totalEfficiency/count).toFixed(1)),

        monthsRecorded:count

    };

};


/*==========================================================
BEST QUARTER
==========================================================*/

KPIEngine.getBestQuarter = function(employeeID, year){

    let bestQuarter = null;

    let highestKPI = -1;

    Object.keys(this.quarters).forEach(quarter=>{

        const performance =

            this.calculateQuarterlyPerformance(

                employeeID,

                year,

                quarter

            );

        if(

            performance &&

            performance.averageKPI > highestKPI

        ){

            highestKPI = performance.averageKPI;

            bestQuarter = performance;

        }

    });

    return bestQuarter;

};


/*==========================================================
YEAR ON YEAR GROWTH
==========================================================*/

KPIEngine.calculateYearGrowth = function(employeeID){

    const history = this.getEmployeeHistory(employeeID);

    const years = Object.keys(history).sort();

    if(years.length < 2){

        return null;

    }

    const latestYear = years[years.length-1];

    const previousYear = years[years.length-2];

    const current =

        this.calculateYearlyPerformance(

            employeeID,

            latestYear

        );

    const previous =

        this.calculateYearlyPerformance(

            employeeID,

            previousYear

        );

    if(!current || !previous){

        return null;

    }

    const growth =

        current.averageKPI -

        previous.averageKPI;

    return{

        previousYear,

        latestYear,

        growth:Number(growth.toFixed(1))

    };

};


/*==========================================================
ORGANISATION YEARLY KPI
==========================================================*/

KPIEngine.getOrganisationYearlyAverage=function(year){

    let total=0;

    let count=0;

    EmployeeDatabase.employees.forEach(employee=>{

        const performance=

            this.calculateYearlyPerformance(

                employee.employeeID,

                year

            );

        if(performance){

            total+=performance.averageKPI;

            count++;

        }

    });

    if(count===0){

        return 0;

    }

    return Number((total/count).toFixed(1));

};


/*==========================================================
REFRESH YEARLY ANALYTICS
==========================================================*/

KPIEngine.refreshYearlyAnalytics=function(){

    EmployeeDatabase.employees.forEach(employee=>{

        this.calculateYearlyPerformance(

            employee.employeeID,

            this.currentYear()

        );

    });

};
/*==========================================================
KPI REPORT GENERATOR
==========================================================*/

KPIEngine.generateEmployeeReport = function(employeeID){

    const employee = EmployeeManager.getEmployeeByID(employeeID);

    if(!employee){

        return null;

    }

    const trend = this.calculateTrend(employeeID);

    const yearly = this.calculateYearlyPerformance(

        employeeID,

        this.currentYear()

    );

    return{

        employeeID: employee.employeeID,

        employeeName: employee.employeeName,

        department: employee.department,

        role: employee.role,

        averageKPI: employee.averageKPI,

        efficiency: employee.efficiencyScore,

        performance: employee.performanceRating,

        trend: trend,

        yearlyPerformance: yearly,

        promotionReady: employee.promotionReady,

        deploymentReady: employee.readyForDeployment,

        riskLevel: employee.riskLevel,

        generatedOn: new Date()

    };

};


/*==========================================================
DEPARTMENT REPORT
==========================================================*/

KPIEngine.generateDepartmentReport=function(department){

    const employees=

        EmployeeManager.getEmployeesByDepartment(

            department

        );

    const analytics=

        this.getDepartmentAnalytics(

            department

        );

    return{

        department:department,

        totalEmployees:employees.length,

        analytics:analytics,

        employees:employees.map(employee=>({

            employeeID:employee.employeeID,

            employeeName:employee.employeeName,

            role:employee.role,

            averageKPI:employee.averageKPI,

            efficiency:employee.efficiencyScore,

            performance:employee.performanceRating

        })),

        generatedOn:new Date()

    };

};


/*==========================================================
ORGANISATION REPORT
==========================================================*/

KPIEngine.generateOrganisationReport=function(){

    this.refreshDashboard();

    return{

        summary:this.getDashboardData(),

        bestDepartment:this.getBestDepartment(),

        lowestDepartment:this.getLowestDepartment(),

        topPerformers:this.getTopPerformers(),

        lowPerformers:this.getLowPerformers(),

        totalDepartments:

            DepartmentMaster.length,

        totalEmployees:

            EmployeeDatabase.employees.length,

        generatedOn:new Date()

    };

};


/*==========================================================
EXPORT EMPLOYEE REPORT
==========================================================*/

KPIEngine.exportEmployeeReport=function(employeeID){

    return JSON.stringify(

        this.generateEmployeeReport(employeeID),

        null,

        2

    );

};


/*==========================================================
EXPORT DEPARTMENT REPORT
==========================================================*/

KPIEngine.exportDepartmentReport=function(department){

    return JSON.stringify(

        this.generateDepartmentReport(department),

        null,

        2

    );

};


/*==========================================================
EXPORT ORGANISATION REPORT
==========================================================*/

KPIEngine.exportOrganisationReport=function(){

    return JSON.stringify(

        this.generateOrganisationReport(),

        null,

        2

    );

};
/*==========================================================
CHART & GRAPH DATA ENGINE
==========================================================*/

KPIEngine.getDepartmentChartData = function(){

    this.refreshDepartmentAnalytics();

    const labels = [];

    const kpiData = [];

    const efficiencyData = [];

    DepartmentMaster.forEach(department=>{

        const analytics =

            this.getDepartmentAnalytics(department);

        labels.push(department);

        kpiData.push(

            analytics ?

            analytics.averageKPI : 0

        );

        efficiencyData.push(

            analytics ?

            analytics.averageEfficiency : 0

        );

    });

    return{

        labels:labels,

        datasets:[

            {

                label:"Average KPI",

                data:kpiData

            },

            {

                label:"Average Efficiency",

                data:efficiencyData

            }

        ]

    };

};


/*==========================================================
TOP PERFORMERS CHART
==========================================================*/

KPIEngine.getTopPerformerChart=function(limit=10){

    const employees=

        this.getTopPerformers(limit);

    return{

        labels:employees.map(

            employee=>employee.employeeName

        ),

        data:employees.map(

            employee=>employee.averageKPI

        )

    };

};


/*==========================================================
LOW PERFORMERS CHART
==========================================================*/

KPIEngine.getLowPerformerChart=function(limit=10){

    const employees=

        this.getLowPerformers(limit);

    return{

        labels:employees.map(

            employee=>employee.employeeName

        ),

        data:employees.map(

            employee=>employee.averageKPI

        )

    };

};


/*==========================================================
PERFORMANCE DISTRIBUTION
==========================================================*/

KPIEngine.getPerformanceDistribution=function(){

    this.refreshDashboard();

    const dashboard=

        this.getDashboardData();

    return{

        labels:[

            "Excellent",

            "Very Good",

            "Good",

            "Average",

            "Poor"

        ],

        data:[

            dashboard.excellentEmployees,

            dashboard.veryGoodEmployees,

            dashboard.goodEmployees,

            dashboard.averageEmployees,

            dashboard.poorEmployees

        ]

    };

};


/*==========================================================
MONTHLY TREND CHART
==========================================================*/

KPIEngine.getMonthlyTrendChart=function(employeeID){

    const history=

        this.getEmployeeHistory(employeeID);

    const labels=[];

    const values=[];

    Object.keys(history).forEach(year=>{

        Object.keys(history[year]).forEach(month=>{

            labels.push(

                month+" "+year

            );

            values.push(

                history[year][month].averageKPI

            );

        });

    });

    return{

        labels:labels,

        data:values

    };

};


/*==========================================================
ORGANISATION SUMMARY CHART
==========================================================*/

KPIEngine.getOrganisationSummaryChart=function(){

    this.refreshDashboard();

    const dashboard=

        this.getDashboardData();

    return{

        averageKPI:

            dashboard.averageKPI,

        averageEfficiency:

            dashboard.averageEfficiency,

        totalEmployees:

            dashboard.totalEmployees

    };

};
/*==========================================================
FINAL INITIALIZATION & UTILITY ENGINE
==========================================================*/

/*==========================================================
REFRESH COMPLETE KPI ENGINE
==========================================================*/

KPIEngine.refresh = function(){

    this.refreshDepartmentAnalytics();

    this.refreshDashboard();

    this.refreshYearlyAnalytics();

};


/*==========================================================
SYSTEM VALIDATION
==========================================================*/

KPIEngine.validateSystem = function(){

    if(typeof EmployeeDatabase === "undefined"){

        console.error(

            "Employee Database Not Found."

        );

        return false;

    }

    if(typeof EmployeeManager === "undefined"){

        console.error(

            "Employee Manager Not Found."

        );

        return false;

    }

    console.log(

        "KPI Engine Validation Successful."

    );

    return true;

};


/*==========================================================
AUTO SYNCHRONIZE
==========================================================*/

KPIEngine.synchronize = function(){

    EmployeeDatabase.employees.forEach(employee=>{

        EmployeeManager.calculateEfficiency(employee);

        EmployeeManager.evaluateEmployee(employee);

    });

    this.refresh();

};


/*==========================================================
SYSTEM INFORMATION
==========================================================*/

KPIEngine.systemInformation = function(){

    return{

        module:"Advanced KPI Engine",

        version:"1.0",

        company:"Serentica Renewables",

        currentYear:this.currentYear(),

        currentQuarter:this.currentQuarter(),

        currentMonth:this.currentMonth(),

        totalEmployees:

            EmployeeDatabase.employees.length,

        totalDepartments:

            DepartmentMaster.length

    };

};


/*==========================================================
SYSTEM STARTUP
==========================================================*/

KPIEngine.initialize = function(){

    if(!this.validateSystem()){

        return;

    }

    this.synchronize();

    console.log(

        "Advanced KPI Engine Initialized Successfully."

    );

};


/*==========================================================
AUTO INITIALIZATION
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        KPIEngine.initialize();

    }

);


/*==========================================================
SYSTEM READY
==========================================================*/

console.log("==========================================");

console.log("Serentica Renewables");

console.log("Advanced KPI Engine");

console.log("Version : 1.0");

console.log("Status : Ready");

console.log("==========================================");
