/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
ADVANCED EFFICIENCY ENGINE
efficiencyEngine.js
Version 1.0
==========================================================*/

"use strict";

/*==========================================================
EFFICIENCY ENGINE
==========================================================*/

const EfficiencyEngine = {

    employeeHistory:{},

    departmentHistory:{},

    organisationHistory:{},

    productivityHistory:{},

    attendanceHistory:{},

    taskHistory:{}

};


/*==========================================================
SYSTEM CONFIGURATION
==========================================================*/

EfficiencyEngine.configuration={

    KPI_WEIGHT:40,

    TASK_WEIGHT:25,

    ATTENDANCE_WEIGHT:15,

    MANAGER_WEIGHT:20

};


/*==========================================================
EFFICIENCY LEVELS
==========================================================*/

EfficiencyEngine.levels={

    Outstanding:{

        minimum:95,

        color:"#2ECC71"

    },

    Excellent:{

        minimum:85,

        color:"#27AE60"

    },

    Good:{

        minimum:75,

        color:"#3498DB"

    },

    Average:{

        minimum:60,

        color:"#F1C40F"

    },

    NeedsImprovement:{

        minimum:40,

        color:"#E67E22"

    },

    Critical:{

        minimum:0,

        color:"#E74C3C"

    }

};


/*==========================================================
DEFAULT VALUES
==========================================================*/

EfficiencyEngine.defaults={

    attendance:100,

    taskCompletion:100,

    managerScore:80

};


/*==========================================================
CURRENT DATE HELPERS
==========================================================*/

EfficiencyEngine.today=function(){

    return new Date().toLocaleDateString();

};

EfficiencyEngine.currentWeek=function(){

    const today=new Date();

    const firstDay=new Date(today.getFullYear(),0,1);

    const week=Math.ceil(

        (

            (

                today-firstDay

            )/

            86400000+

            firstDay.getDay()+1

        )/7

    );

    return week;

};

EfficiencyEngine.currentMonth=function(){

    return new Date().getMonth()+1;

};

EfficiencyEngine.currentYear=function(){

    return new Date().getFullYear();

};


/*==========================================================
SYSTEM READY
==========================================================*/

console.log(

    "Advanced Efficiency Engine Loaded."

);
/*==========================================================
TASK COMPLETION ENGINE
==========================================================*/

EfficiencyEngine.initializeEmployeeTasks = function(employeeID){

    if(!this.taskHistory[employeeID]){

        this.taskHistory[employeeID]={

            assignedTasks:[],

            completedTasks:[],

            overdueTasks:[],

            taskCompletionPercentage:0

        };

    }

};


/*==========================================================
ASSIGN TASK
==========================================================*/

EfficiencyEngine.assignTask = function(

    employeeID,

    taskTitle,

    dueDate,

    priority="Medium"

){

    this.initializeEmployeeTasks(employeeID);

    this.taskHistory[employeeID].assignedTasks.push({

        taskID:"TASK"+Date.now(),

        title:taskTitle,

        assignedOn:new Date(),

        dueDate:dueDate,

        priority:priority,

        status:"Assigned"

    });

};


/*==========================================================
COMPLETE TASK
==========================================================*/

EfficiencyEngine.completeTask=function(

    employeeID,

    taskID

){

    this.initializeEmployeeTasks(employeeID);

    const employeeTasks=this.taskHistory[employeeID];

    const index=employeeTasks.assignedTasks.findIndex(

        task=>task.taskID===taskID

    );

    if(index===-1){

        return false;

    }

    const task=employeeTasks.assignedTasks[index];

    task.status="Completed";

    task.completedOn=new Date();

    employeeTasks.completedTasks.push(task);

    employeeTasks.assignedTasks.splice(index,1);

    this.calculateTaskCompletion(employeeID);

    return true;

};


/*==========================================================
MARK TASK AS OVERDUE
==========================================================*/

EfficiencyEngine.markTaskOverdue=function(

    employeeID,

    taskID

){

    this.initializeEmployeeTasks(employeeID);

    const employeeTasks=this.taskHistory[employeeID];

    const task=employeeTasks.assignedTasks.find(

        item=>item.taskID===taskID

    );

    if(!task){

        return;

    }

    task.status="Overdue";

    employeeTasks.overdueTasks.push(task);

};


/*==========================================================
TASK COMPLETION %
==========================================================*/

EfficiencyEngine.calculateTaskCompletion=function(employeeID){

    this.initializeEmployeeTasks(employeeID);

    const employeeTasks=this.taskHistory[employeeID];

    const completed=employeeTasks.completedTasks.length;

    const pending=employeeTasks.assignedTasks.length;

    const overdue=employeeTasks.overdueTasks.length;

    const total=

        completed+

        pending+

        overdue;

    if(total===0){

        employeeTasks.taskCompletionPercentage=100;

        return 100;

    }

    employeeTasks.taskCompletionPercentage=

        Number(

            (

                (completed/total)*100

            ).toFixed(1)

        );

    return employeeTasks.taskCompletionPercentage;

};


/*==========================================================
GET TASK SUMMARY
==========================================================*/

EfficiencyEngine.getTaskSummary=function(employeeID){

    this.initializeEmployeeTasks(employeeID);

    return this.taskHistory[employeeID];

};
/*==========================================================
ATTENDANCE ENGINE
==========================================================*/

EfficiencyEngine.initializeAttendance = function(employeeID){

    if(!this.attendanceHistory[employeeID]){

        this.attendanceHistory[employeeID]={

            records:[],

            attendancePercentage:100,

            totalWorkingDays:0,

            daysPresent:0,

            daysAbsent:0,

            lateEntries:0,

            approvedLeaves:0

        };

    }

};


/*==========================================================
MARK ATTENDANCE
==========================================================*/

EfficiencyEngine.markAttendance = function(

    employeeID,

    status,

    remarks=""

){

    this.initializeAttendance(employeeID);

    const attendance = this.attendanceHistory[employeeID];

    attendance.records.push({

        date:new Date(),

        status:status,

        remarks:remarks

    });

    attendance.totalWorkingDays++;

    switch(status){

        case "Present":

            attendance.daysPresent++;

            break;

        case "Absent":

            attendance.daysAbsent++;

            break;

        case "Late":

            attendance.daysPresent++;

            attendance.lateEntries++;

            break;

        case "Leave":

            attendance.approvedLeaves++;

            break;

    }

    this.calculateAttendance(employeeID);

};


/*==========================================================
ATTENDANCE PERCENTAGE
==========================================================*/

EfficiencyEngine.calculateAttendance = function(employeeID){

    this.initializeAttendance(employeeID);

    const attendance = this.attendanceHistory[employeeID];

    if(attendance.totalWorkingDays===0){

        attendance.attendancePercentage=100;

        return 100;

    }

    attendance.attendancePercentage=

        Number(

            (

                (

                    attendance.daysPresent /

                    attendance.totalWorkingDays

                )*100

            ).toFixed(1)

        );

    return attendance.attendancePercentage;

};


/*==========================================================
GET ATTENDANCE SUMMARY
==========================================================*/

EfficiencyEngine.getAttendanceSummary=function(employeeID){

    this.initializeAttendance(employeeID);

    return this.attendanceHistory[employeeID];

};


/*==========================================================
MONTHLY ATTENDANCE
==========================================================*/

EfficiencyEngine.getMonthlyAttendance=function(employeeID){

    this.initializeAttendance(employeeID);

    const attendance=this.attendanceHistory[employeeID];

    const month=new Date().getMonth();

    const year=new Date().getFullYear();

    return attendance.records.filter(record=>{

        const date=new Date(record.date);

        return(

            date.getMonth()===month &&

            date.getFullYear()===year

        );

    });

};


/*==========================================================
ABSENTEEISM RATE
==========================================================*/

EfficiencyEngine.getAbsenteeismRate=function(employeeID){

    this.initializeAttendance(employeeID);

    const attendance=this.attendanceHistory[employeeID];

    if(attendance.totalWorkingDays===0){

        return 0;

    }

    return Number(

        (

            (

                attendance.daysAbsent /

                attendance.totalWorkingDays

            )*100

        ).toFixed(1)

    );

};


/*==========================================================
PUNCTUALITY SCORE
==========================================================*/

EfficiencyEngine.getPunctualityScore=function(employeeID){

    this.initializeAttendance(employeeID);

    const attendance=this.attendanceHistory[employeeID];

    if(attendance.totalWorkingDays===0){

        return 100;

    }

    const score=

        100-

        (

            (

                attendance.lateEntries /

                attendance.totalWorkingDays

            )*100

        );

    return Math.max(

        0,

        Number(score.toFixed(1))

    );

};
/*==========================================================
DAILY & WEEKLY EFFICIENCY ENGINE
==========================================================*/

EfficiencyEngine.calculateDailyEfficiency = function(employeeID){

    const employee = EmployeeManager.getEmployeeByID(employeeID);

    if(!employee){

        return 0;

    }

    /*--------------------------------------------
    KPI SCORE
    ---------------------------------------------*/

    const kpiScore = Number(employee.averageKPI || 0);

    /*--------------------------------------------
    TASK SCORE
    ---------------------------------------------*/

    const taskSummary = this.getTaskSummary(employeeID);

    const taskScore = Number(

        taskSummary.taskCompletionPercentage || 0

    );

    /*--------------------------------------------
    ATTENDANCE SCORE
    ---------------------------------------------*/

    const attendance = this.getAttendanceSummary(employeeID);

    const attendanceScore = Number(

        attendance.attendancePercentage || 0

    );

    /*--------------------------------------------
    MANAGER SCORE
    ---------------------------------------------*/

    const managerScore = Number(

        employee.managerScore ||

        this.defaults.managerScore

    );

    /*--------------------------------------------
    FINAL SCORE
    ---------------------------------------------*/

    const efficiency =

        (

            (kpiScore * this.configuration.KPI_WEIGHT / 100)

            +

            (taskScore * this.configuration.TASK_WEIGHT / 100)

            +

            (attendanceScore * this.configuration.ATTENDANCE_WEIGHT / 100)

            +

            (managerScore * this.configuration.MANAGER_WEIGHT / 100)

        );

    employee.efficiencyScore =

        Number(

            efficiency.toFixed(1)

        );

    return employee.efficiencyScore;

};


/*==========================================================
SAVE DAILY HISTORY
==========================================================*/

EfficiencyEngine.saveDailyEfficiency=function(employeeID){

    if(!this.employeeHistory[employeeID]){

        this.employeeHistory[employeeID]=[];

    }

    const employee=

        EmployeeManager.getEmployeeByID(employeeID);

    this.employeeHistory[employeeID].push({

        date:new Date(),

        efficiency:employee.efficiencyScore,

        kpi:employee.averageKPI,

        attendance:

            this.getAttendanceSummary(employeeID)

            .attendancePercentage,

        taskCompletion:

            this.getTaskSummary(employeeID)

            .taskCompletionPercentage

    });

};


/*==========================================================
GET DAILY HISTORY
==========================================================*/

EfficiencyEngine.getDailyHistory=function(employeeID){

    return this.employeeHistory[employeeID] || [];

};


/*==========================================================
WEEKLY AVERAGE
==========================================================*/

EfficiencyEngine.calculateWeeklyEfficiency=function(employeeID){

    const history=this.getDailyHistory(employeeID);

    if(history.length===0){

        return 0;

    }

    const latest=

        history.slice(-7);

    let total=0;

    latest.forEach(day=>{

        total+=day.efficiency;

    });

    return Number(

        (

            total/

            latest.length

        ).toFixed(1)

    );

};


/*==========================================================
MONTHLY AVERAGE
==========================================================*/

EfficiencyEngine.calculateMonthlyEfficiency=function(employeeID){

    const history=this.getDailyHistory(employeeID);

    if(history.length===0){

        return 0;

    }

    const month=new Date().getMonth();

    const year=new Date().getFullYear();

    const records=

        history.filter(record=>{

            const date=new Date(record.date);

            return(

                date.getMonth()===month &&

                date.getFullYear()===year

            );

        });

    if(records.length===0){

        return 0;

    }

    let total=0;

    records.forEach(record=>{

        total+=record.efficiency;

    });

    return Number(

        (

            total/

            records.length

        ).toFixed(1)

    );

};


/*==========================================================
REFRESH EMPLOYEE EFFICIENCY
==========================================================*/

EfficiencyEngine.refreshEmployee=function(employeeID){

    this.calculateDailyEfficiency(employeeID);

    this.saveDailyEfficiency(employeeID);

};
/*==========================================================
TEAM & DEPARTMENT EFFICIENCY ENGINE
==========================================================*/

EfficiencyEngine.calculateDepartmentEfficiency = function(department){

    const employees = EmployeeManager.getEmployeesByDepartment(

        department

    );

    if(employees.length===0){

        return{

            department:department,

            averageEfficiency:0,

            highestEfficiency:0,

            lowestEfficiency:0,

            totalEmployees:0,

            topPerformer:null,

            lowestPerformer:null

        };

    }

    let totalEfficiency=0;

    let highestEfficiency=0;

    let lowestEfficiency=100;

    let topPerformer=null;

    let lowestPerformer=null;

    employees.forEach(employee=>{

        const efficiency=

            Number(employee.efficiencyScore||0);

        totalEfficiency+=efficiency;

        if(efficiency>highestEfficiency){

            highestEfficiency=efficiency;

            topPerformer=employee.employeeName;

        }

        if(efficiency<lowestEfficiency){

            lowestEfficiency=efficiency;

            lowestPerformer=employee.employeeName;

        }

    });

    return{

        department:department,

        averageEfficiency:Number(

            (

                totalEfficiency/

                employees.length

            ).toFixed(1)

        ),

        highestEfficiency:highestEfficiency,

        lowestEfficiency:lowestEfficiency,

        totalEmployees:employees.length,

        topPerformer:topPerformer,

        lowestPerformer:lowestPerformer

    };

};


/*==========================================================
TEAM EFFICIENCY
==========================================================*/

EfficiencyEngine.calculateTeamEfficiency=function(teamLead){

    const team=

        EmployeeDatabase.employees.filter(

            employee=>

            employee.teamLead===teamLead

        );

    if(team.length===0){

        return 0;

    }

    let total=0;

    team.forEach(employee=>{

        total+=employee.efficiencyScore||0;

    });

    return Number(

        (

            total/

            team.length

        ).toFixed(1)

    );

};


/*==========================================================
ORGANISATION EFFICIENCY
==========================================================*/

EfficiencyEngine.calculateOrganisationEfficiency=function(){

    const employees=EmployeeDatabase.employees;

    if(employees.length===0){

        return 0;

    }

    let total=0;

    employees.forEach(employee=>{

        total+=employee.efficiencyScore||0;

    });

    return Number(

        (

            total/

            employees.length

        ).toFixed(1)

    );

};


/*==========================================================
RANK DEPARTMENTS
==========================================================*/

EfficiencyEngine.rankDepartments=function(){

    const ranking=[];

    DepartmentMaster.forEach(department=>{

        ranking.push(

            this.calculateDepartmentEfficiency(

                department

            )

        );

    });

    ranking.sort(

        (a,b)=>

        b.averageEfficiency-

        a.averageEfficiency

    );

    return ranking;

};


/*==========================================================
BEST DEPARTMENT
==========================================================*/

EfficiencyEngine.getBestDepartment=function(){

    const ranking=this.rankDepartments();

    return ranking.length>0

        ?ranking[0]

        :null;

};


/*==========================================================
LOWEST DEPARTMENT
==========================================================*/

EfficiencyEngine.getLowestDepartment=function(){

    const ranking=this.rankDepartments();

    return ranking.length>0

        ?ranking[ranking.length-1]

        :null;

};


/*==========================================================
REFRESH DEPARTMENT HISTORY
==========================================================*/

EfficiencyEngine.refreshDepartmentHistory=function(){

    DepartmentMaster.forEach(department=>{

        if(!this.departmentHistory[department]){

            this.departmentHistory[department]=[];

        }

        this.departmentHistory[department].push({

            date:new Date(),

            efficiency:

                this.calculateDepartmentEfficiency(

                    department

                ).averageEfficiency

        });

    });

};
/*==========================================================
PRODUCTIVITY ANALYTICS ENGINE
==========================================================*/

/*==========================================================
EMPLOYEE PRODUCTIVITY SCORE
==========================================================*/

EfficiencyEngine.calculateProductivityScore = function(employeeID){

    const employee = EmployeeManager.getEmployeeByID(employeeID);

    if(!employee){

        return 0;

    }

    const taskSummary = this.getTaskSummary(employeeID);

    const attendance = this.getAttendanceSummary(employeeID);

    const efficiency = Number(employee.efficiencyScore || 0);

    const productivity =

        (

            (efficiency * 0.50)

            +

            ((taskSummary.taskCompletionPercentage || 0) * 0.30)

            +

            ((attendance.attendancePercentage || 0) * 0.20)

        );

    return Number(productivity.toFixed(1));

};


/*==========================================================
SAVE PRODUCTIVITY HISTORY
==========================================================*/

EfficiencyEngine.saveProductivityHistory = function(employeeID){

    if(!this.productivityHistory[employeeID]){

        this.productivityHistory[employeeID] = [];

    }

    this.productivityHistory[employeeID].push({

        date:new Date(),

        productivity:

            this.calculateProductivityScore(employeeID)

    });

};


/*==========================================================
GET PRODUCTIVITY HISTORY
==========================================================*/

EfficiencyEngine.getProductivityHistory = function(employeeID){

    return this.productivityHistory[employeeID] || [];

};


/*==========================================================
TOP PRODUCTIVE EMPLOYEES
==========================================================*/

EfficiencyEngine.getTopProductiveEmployees = function(limit=10){

    return [...EmployeeDatabase.employees]

        .map(employee=>{

            return{

                employeeID:employee.employeeID,

                employeeName:employee.employeeName,

                department:employee.department,

                productivity:

                    this.calculateProductivityScore(

                        employee.employeeID

                    )

            };

        })

        .sort(

            (a,b)=>b.productivity-a.productivity

        )

        .slice(0,limit);

};


/*==========================================================
LOW PRODUCTIVE EMPLOYEES
==========================================================*/

EfficiencyEngine.getLowProductiveEmployees = function(limit=10){

    return [...EmployeeDatabase.employees]

        .map(employee=>{

            return{

                employeeID:employee.employeeID,

                employeeName:employee.employeeName,

                department:employee.department,

                productivity:

                    this.calculateProductivityScore(

                        employee.employeeID

                    )

            };

        })

        .sort(

            (a,b)=>a.productivity-b.productivity

        )

        .slice(0,limit);

};


/*==========================================================
DEPARTMENT PRODUCTIVITY
==========================================================*/

EfficiencyEngine.calculateDepartmentProductivity=function(department){

    const employees=

        EmployeeManager.getEmployeesByDepartment(department);

    if(employees.length===0){

        return 0;

    }

    let total=0;

    employees.forEach(employee=>{

        total+=

            this.calculateProductivityScore(

                employee.employeeID

            );

    });

    return Number(

        (

            total/

            employees.length

        ).toFixed(1)

    );

};


/*==========================================================
ORGANISATION PRODUCTIVITY
==========================================================*/

EfficiencyEngine.calculateOrganisationProductivity=function(){

    if(EmployeeDatabase.employees.length===0){

        return 0;

    }

    let total=0;

    EmployeeDatabase.employees.forEach(employee=>{

        total+=

            this.calculateProductivityScore(

                employee.employeeID

            );

    });

    return Number(

        (

            total/

            EmployeeDatabase.employees.length

        ).toFixed(1)

    );

};


/*==========================================================
REFRESH PRODUCTIVITY
==========================================================*/

EfficiencyEngine.refreshProductivity=function(){

    EmployeeDatabase.employees.forEach(employee=>{

        this.saveProductivityHistory(

            employee.employeeID

        );

    });

};
/*==========================================================
EXECUTIVE WORKFORCE ANALYTICS ENGINE
==========================================================*/

/*==========================================================
EXECUTIVE SUMMARY
==========================================================*/

EfficiencyEngine.generateExecutiveSummary = function(){

    const organisationEfficiency =

        this.calculateOrganisationEfficiency();

    const organisationProductivity =

        this.calculateOrganisationProductivity();

    const bestDepartment =

        this.getBestDepartment();

    const lowestDepartment =

        this.getLowestDepartment();

    const promotionPipeline =

        EmployeeManager.getPromotionCandidates().length;

    const deploymentPipeline =

        EmployeeManager.getDeploymentCandidates().length;

    const recallPipeline =

        EmployeeManager.getRecallCandidates().length;

    const highRiskEmployees =

        EmployeeManager.getHighRiskEmployees().length;

    return{

        totalEmployees:

            EmployeeDatabase.employees.length,

        organisationEfficiency:

            organisationEfficiency,

        organisationProductivity:

            organisationProductivity,

        bestDepartment:

            bestDepartment,

        lowestDepartment:

            lowestDepartment,

        promotionPipeline:

            promotionPipeline,

        deploymentPipeline:

            deploymentPipeline,

        recallPipeline:

            recallPipeline,

        highRiskEmployees:

            highRiskEmployees,

        generatedOn:new Date()

    };

};


/*==========================================================
WORKFORCE HEALTH INDEX
==========================================================*/

EfficiencyEngine.calculateWorkforceHealthIndex=function(){

    const efficiency=

        this.calculateOrganisationEfficiency();

    const productivity=

        this.calculateOrganisationProductivity();

    const health=

        (

            efficiency*0.60+

            productivity*0.40

        );

    return Number(

        health.toFixed(1)

    );

};


/*==========================================================
WORKFORCE STATUS
==========================================================*/

EfficiencyEngine.getWorkforceStatus=function(){

    const score=

        this.calculateWorkforceHealthIndex();

    if(score>=90){

        return "Excellent";

    }

    if(score>=80){

        return "Healthy";

    }

    if(score>=70){

        return "Stable";

    }

    if(score>=60){

        return "Needs Attention";

    }

    return "Critical";

};


/*==========================================================
HIGH RISK DEPARTMENTS
==========================================================*/

EfficiencyEngine.getHighRiskDepartments=function(){

    return this.rankDepartments()

        .filter(

            department=>

            department.averageEfficiency<65

        );

};


/*==========================================================
EXECUTIVE ALERTS
==========================================================*/

EfficiencyEngine.getExecutiveAlerts=function(){

    const alerts=[];

    if(

        this.calculateWorkforceHealthIndex()<70

    ){

        alerts.push(

            "Overall workforce health is below the expected threshold."

        );

    }

    if(

        EmployeeManager.getHighRiskEmployees().length>0

    ){

        alerts.push(

            "High-risk employees require immediate management review."

        );

    }

    if(

        this.getHighRiskDepartments().length>0

    ){

        alerts.push(

            "One or more departments require performance improvement."

        );

    }

    if(

        EmployeeManager.getRecallCandidates().length>0

    ){

        alerts.push(

            "Recall recommendations are pending approval."

        );

    }

    return alerts;

};


/*==========================================================
EXECUTIVE DASHBOARD DATA
==========================================================*/

EfficiencyEngine.getExecutiveDashboard=function(){

    return{

        summary:

            this.generateExecutiveSummary(),

        workforceHealth:

            this.calculateWorkforceHealthIndex(),

        workforceStatus:

            this.getWorkforceStatus(),

        alerts:

            this.getExecutiveAlerts(),

        bestDepartment:

            this.getBestDepartment(),

        lowestDepartment:

            this.getLowestDepartment(),

        topEmployees:

            this.getTopProductiveEmployees(5),

        highRiskDepartments:

            this.getHighRiskDepartments()

    };

};
/*==========================================================
CHARTS & DASHBOARD DATA ENGINE
==========================================================*/

/*==========================================================
DEPARTMENT EFFICIENCY CHART
==========================================================*/

EfficiencyEngine.getDepartmentEfficiencyChart = function(){

    const ranking = this.rankDepartments();

    return{

        labels:ranking.map(

            item=>item.department

        ),

        datasets:[

            {

                label:"Average Efficiency",

                data:ranking.map(

                    item=>item.averageEfficiency

                )

            }

        ]

    };

};


/*==========================================================
PRODUCTIVITY CHART
==========================================================*/

EfficiencyEngine.getProductivityChart = function(limit=10){

    const employees =

        this.getTopProductiveEmployees(limit);

    return{

        labels:employees.map(

            employee=>employee.employeeName

        ),

        datasets:[

            {

                label:"Productivity",

                data:employees.map(

                    employee=>employee.productivity

                )

            }

        ]

    };

};


/*==========================================================
WORKFORCE HEALTH CHART
==========================================================*/

EfficiencyEngine.getWorkforceHealthChart=function(){

    return{

        labels:[

            "Efficiency",

            "Productivity"

        ],

        datasets:[

            {

                label:"Organisation",

                data:[

                    this.calculateOrganisationEfficiency(),

                    this.calculateOrganisationProductivity()

                ]

            }

        ]

    };

};


/*==========================================================
ATTENDANCE DISTRIBUTION
==========================================================*/

EfficiencyEngine.getAttendanceChart=function(){

    let present=0;

    let absent=0;

    let leave=0;

    let late=0;

    Object.values(this.attendanceHistory).forEach(history=>{

        present+=history.daysPresent;

        absent+=history.daysAbsent;

        leave+=history.approvedLeaves;

        late+=history.lateEntries;

    });

    return{

        labels:[

            "Present",

            "Absent",

            "Leave",

            "Late"

        ],

        datasets:[

            {

                label:"Attendance",

                data:[

                    present,

                    absent,

                    leave,

                    late

                ]

            }

        ]

    };

};


/*==========================================================
TASK STATUS CHART
==========================================================*/

EfficiencyEngine.getTaskChart=function(){

    let assigned=0;

    let completed=0;

    let overdue=0;

    Object.values(this.taskHistory).forEach(tasks=>{

        assigned+=tasks.assignedTasks.length;

        completed+=tasks.completedTasks.length;

        overdue+=tasks.overdueTasks.length;

    });

    return{

        labels:[

            "Assigned",

            "Completed",

            "Overdue"

        ],

        datasets:[

            {

                label:"Tasks",

                data:[

                    assigned,

                    completed,

                    overdue

                ]

            }

        ]

    };

};


/*==========================================================
EXECUTIVE DASHBOARD CHARTS
==========================================================*/

EfficiencyEngine.getExecutiveCharts=function(){

    return{

        departmentEfficiency:

            this.getDepartmentEfficiencyChart(),

        productivity:

            this.getProductivityChart(),

        workforceHealth:

            this.getWorkforceHealthChart(),

        attendance:

            this.getAttendanceChart(),

        tasks:

            this.getTaskChart()

    };

};


/*==========================================================
REFRESH CHARTS
==========================================================*/

EfficiencyEngine.refreshCharts=function(){

    return this.getExecutiveCharts();

};
/*==========================================================
FINAL INITIALIZATION & UTILITY ENGINE
==========================================================*/

/*==========================================================
REFRESH COMPLETE ENGINE
==========================================================*/

EfficiencyEngine.refresh = function(){

    EmployeeDatabase.employees.forEach(employee=>{

        this.refreshEmployee(

            employee.employeeID

        );

    });

    this.refreshDepartmentHistory();

    this.refreshProductivity();

};


/*==========================================================
VALIDATE ENGINE
==========================================================*/

EfficiencyEngine.validateSystem = function(){

    if(typeof EmployeeDatabase==="undefined"){

        console.error(

            "Employee Database Missing."

        );

        return false;

    }

    if(typeof EmployeeManager==="undefined"){

        console.error(

            "Employee Manager Missing."

        );

        return false;

    }

    console.log(

        "Efficiency Engine Validation Successful."

    );

    return true;

};


/*==========================================================
SYSTEM INFORMATION
==========================================================*/

EfficiencyEngine.systemInformation=function(){

    return{

        module:"Advanced Efficiency Engine",

        version:"1.0",

        company:"Serentica Renewables",

        totalEmployees:

            EmployeeDatabase.employees.length,

        totalDepartments:

            DepartmentMaster.length,

        organisationEfficiency:

            this.calculateOrganisationEfficiency(),

        organisationProductivity:

            this.calculateOrganisationProductivity(),

        workforceHealth:

            this.calculateWorkforceHealthIndex(),

        generatedOn:new Date()

    };

};


/*==========================================================
INITIALIZE ENGINE
==========================================================*/

EfficiencyEngine.initialize=function(){

    if(!this.validateSystem()){

        return;

    }

    this.refresh();

    console.log(

        "Advanced Efficiency Engine Initialized Successfully."

    );

};


/*==========================================================
AUTO INITIALIZATION
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        EfficiencyEngine.initialize();

    }

);


/*==========================================================
SYSTEM READY
==========================================================*/

console.log("==========================================");
console.log("Serentica Renewables");
console.log("Advanced Efficiency Engine");
console.log("Version : 1.0");
console.log("Status : Ready");
console.log("==========================================");
 
