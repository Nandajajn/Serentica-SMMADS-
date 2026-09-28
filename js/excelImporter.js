/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
EXCEL IMPORT ENGINE
excelImporter.js

VERSION : 2.0

PURPOSE:
- Import employee data from Excel
- Support multiple Excel files
- Support multiple sheets
- Map Excel columns to Employee Master
- Validate employee IDs
- Add new employees
- Update existing employees
- Generate import summary
- Maintain import history
==========================================================*/

"use strict";


/*==========================================================
1. EXCEL IMPORTER
==========================================================*/

const ExcelImporter = {

    version: "2.0",

    supportedExtensions: [
        ".xlsx",
        ".xls"
    ],


    /*======================================================
    2. EXCEL COLUMN MAPPING
    ======================================================*/

    columnMapping: {

        employeeID: [
            "Emp Code",
            "Employee ID",
            "Employee Code",
            "Emp ID"
        ],

        employeeName: [
            "Emp Name",
            "Employee Name",
            "Name"
        ],

        designation: [
            "Designation",
            "Job Title",
            "Job Designation"
        ],

        role: [
            "Job Role",
            "Role",
            "Employee Role"
        ],

        department: [
            "Department",
            "Dept"
        ],

        phone: [
            "Contact",
            "Contact Number",
            "Phone",
            "Mobile"
        ],

        email: [
            "Email ID",
            "Email",
            "Email Address"
        ],

        employmentType: [
            "Employment Type",
            "EmploymentType",
            "Onroll / Off-role",
            "Onroll/Off-role",
            "On-roll / Off-role",
            "On-roll/Off-role"
        ],

        address: [
            "Residential District",
            "Address",
            "District"
        ],

        status: [
            "Status",
            "Employee Status"
        ],

        currentProject: [
            "Current Project",
            "CurrentProject",
            "Project"
        ],

        currentSite: [
            "Current Site",
            "CurrentSite",
            "Site"
        ],

        reportingManager: [
            "Reporting Manager",
            "ReportingManager",
            "Manager"
        ],

        deploymentStatus: [
            "Deployment Status",
            "DeploymentStatus"
        ]

    },


    /*======================================================
    3. NORMALIZE COLUMN NAME
    ======================================================*/

    normalizeColumnName(value) {

        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/[_-]/g, " ")
            .replace(/\s+/g, " ");

    },


    /*======================================================
    4. FIND MATCHING COLUMN
    ======================================================*/

    findColumn(headers, possibleNames) {

        if (!Array.isArray(headers)) {

            return null;

        }

        const normalizedHeaders =
            headers.map(header => ({

                original: header,

                normalized:
                    this.normalizeColumnName(header)

            }));


        for (const possibleName of possibleNames) {

            const target =
                this.normalizeColumnName(
                    possibleName
                );


            const match =
                normalizedHeaders.find(
                    header =>
                        header.normalized === target
                );


            if (match) {

                return match.original;

            }

        }


        return null;

    },


    /*======================================================
    5. DETECT COLUMN MAPPING
    ======================================================*/

    detectColumnMapping(headers) {

        const mapping = {};


        Object.keys(
            this.columnMapping
        ).forEach(field => {

            mapping[field] =
                this.findColumn(
                    headers,
                    this.columnMapping[field]
                );

        });


        return mapping;

    },


    /*======================================================
    6. GET CELL VALUE
    ======================================================*/

    getCellValue(row, column) {

        if (!column) {

            return "";

        }

        if (!row) {

            return "";

        }

        const value = row[column];

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }

        return String(value).trim();

    },


    /*======================================================
    7. DETERMINE PROJECT FROM SHEET
    ======================================================*/

    determineProject(
        explicitProject,
        sheetName
    ) {

        if (explicitProject) {

            return explicitProject;

        }

        const sheet =
            String(sheetName || "")
                .trim()
                .toLowerCase();


        if (sheet === "wind") {

            return "Wind";

        }


        if (sheet === "solar") {

            return "Solar";

        }


        return "";

    },


    /*======================================================
    8. DETERMINE SITE
    ======================================================*/

    determineSite(
        explicitSite
    ) {

        if (explicitSite) {

            return explicitSite;

        }

        /*
        Current prototype default.

        If the Excel file contains
        Current Site, that value always
        takes priority.
        */

        return "Koppal";

    },


    /*======================================================
    9. MAP EXCEL ROW TO EMPLOYEE
    ======================================================*/

    mapRowToEmployee(
        row,
        mapping,
        sheetName
    ) {

        const getValue =
            field =>
                this.getCellValue(
                    row,
                    mapping[field]
                );


        const project =
            this.determineProject(
                getValue("currentProject"),
                sheetName
            );


        const site =
            this.determineSite(
                getValue("currentSite")
            );


        const status =
            getValue("status") ||
            "Active";


        return {

            employeeID:
                getValue("employeeID"),

            employeeName:
                getValue("employeeName"),

            designation:
                getValue("designation"),

            role:
                getValue("role"),

            department:
                getValue("department"),

            phone:
                getValue("phone"),

            email:
                getValue("email"),

            employmentType:
                getValue("employmentType"),

            address:
                getValue("address"),

            status:
                status,

            currentProject:
                project,

            currentSite:
                site,

            reportingManager:
                getValue("reportingManager"),

            deploymentStatus:
                getValue("deploymentStatus") ||
                "Available",

            company:
                "Serentica Renewables"

        };

    },


    /*======================================================
    10. VALIDATE EMPLOYEE ROW
    ======================================================*/

    validateRow(employeeData) {

        const errors = [];


        if (!employeeData.employeeID) {

            errors.push(
                "Employee ID is missing."
            );

        }


        if (!employeeData.employeeName) {

            errors.push(
                "Employee Name is missing."
            );

        }


        if (!employeeData.department) {

            errors.push(
                "Department is missing."
            );

        }


        if (!employeeData.role) {

            errors.push(
                "Job Role is missing."
            );

        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors

        };

    },


    /*======================================================
    11. VALIDATE UNIQUE EMPLOYEE IDS
    ======================================================*/

    validateUniqueIDs(employeeList) {

        const seen =
            new Set();

        const duplicateIDs =
            [];


        employeeList.forEach(employee => {

            const id =
                String(
                    employee.employeeID || ""
                ).trim();


            if (!id) {

                return;

            }


            if (seen.has(id)) {

                duplicateIDs.push(id);

            }

            else {

                seen.add(id);

            }

        });


        return {

            valid:
                duplicateIDs.length === 0,

            duplicateIDs:
                [
                    ...new Set(
                        duplicateIDs
                    )
                ]

        };

    },


    /*======================================================
    12. CHECK EXISTING EMPLOYEE IDs
    ======================================================*/

    getExistingEmployeeIDs() {

        const existingIDs =
            new Set();


        try {

            if (
                typeof EmployeeManager !==
                "undefined"
            ) {

                let employees = [];


                if (
                    typeof EmployeeManager
                        .getAllEmployees ===
                    "function"
                ) {

                    employees =
                        EmployeeManager
                            .getAllEmployees();

                }


                else if (
                    typeof EmployeeManager
                        .getAll ===
                    "function"
                ) {

                    employees =
                        EmployeeManager
                            .getAll();

                }


                if (Array.isArray(employees)) {

                    employees.forEach(
                        employee => {

                            if (
                                employee &&
                                employee.employeeID
                            ) {

                                existingIDs.add(
                                    String(
                                        employee.employeeID
                                    ).trim()
                                );

                            }

                        }
                    );

                }

            }

        }

        catch (error) {

            console.error(
                "Unable to read existing employee IDs:",
                error
            );

        }


        return existingIDs;

    },


    /*======================================================
    13. PROCESS SINGLE SHEET
    ======================================================*/

    processSheet(
        sheetName,
        rows
    ) {

        if (!Array.isArray(rows)) {

            return {

                sheetName:
                    sheetName,

                records: [],

                errors: [],

                mapping: {}

            };

        }


        if (rows.length === 0) {

            return {

                sheetName:
                    sheetName,

                records: [],

                errors: [],

                mapping: {}

            };

        }


        const headers =
            Object.keys(rows[0] || {});


        const mapping =
            this.detectColumnMapping(
                headers
            );


        const records = [];

        const errors = [];


        /*
        Required Excel fields
        */

        const requiredFields = [
            "employeeID",
            "employeeName",
            "department",
            "role"
        ];


        requiredFields.forEach(
            field => {

                if (!mapping[field]) {

                    errors.push({

                        row:
                            "Header",

                        employeeID:
                            "",

                        errors: [

                            `Required column missing: ${field}`

                        ]

                    });

                }

            }
        );


        /*
        Stop processing if required
        columns are missing.
        */

        if (errors.length > 0) {

            return {

                sheetName:
                    sheetName,

                records: [],

                errors: errors,

                mapping: mapping

            };

        }


        /*==================================================
        PROCESS ROWS
        ==================================================*/

        rows.forEach(
            (row, index) => {

                const employee =
                    this.mapRowToEmployee(
                        row,
                        mapping,
                        sheetName
                    );


                const validation =
                    this.validateRow(
                        employee
                    );


                if (!validation.valid) {

                    errors.push({

                        row:
                            index + 2,

                        employeeID:
                            employee.employeeID,

                        employee:
                            employee,

                        errors:
                            validation.errors

                    });

                    return;

                }


                records.push(
                    employee
                );

            }
        );


        /*==================================================
        CHECK DUPLICATE IDs INSIDE SHEET
        ==================================================*/

        const uniqueCheck =
            this.validateUniqueIDs(
                records
            );


        if (!uniqueCheck.valid) {

            uniqueCheck.duplicateIDs
                .forEach(id => {

                    errors.push({

                        row:
                            "Multiple",

                        employeeID:
                            id,

                        errors: [

                            "Duplicate Employee ID found in uploaded sheet."

                        ]

                    });

                });

        }


        return {

            sheetName:
                sheetName,

            records:
                records,

            errors:
                errors,

            mapping:
                mapping

        };

    },


    /*======================================================
    14. IMPORT RECORDS
    ======================================================*/

    importRecords(
        records,
        metadata = {}
    ) {

        if (!Array.isArray(records)) {

            return {

                success: false,

                added: 0,

                updated: 0,

                failed: 0,

                totalProcessed: 0

            };

        }


        if (
            typeof EmployeeManager ===
            "undefined"
        ) {

            console.error(
                "EmployeeManager is not available."
            );


            return {

                success: false,

                added: 0,

                updated: 0,

                failed: records.length,

                totalProcessed: 0,

                message:
                    "EmployeeManager is not available."

            };

        }


        /*
        EmployeeManager must provide
        bulkAddEmployees().
        */

        if (
            typeof EmployeeManager
                .bulkAddEmployees !==
            "function"
        ) {

            console.error(
                "EmployeeManager.bulkAddEmployees() is not available."
            );


            return {

                success: false,

                added: 0,

                updated: 0,

                failed: records.length,

                totalProcessed: 0,

                message:
                    "EmployeeManager.bulkAddEmployees() is not available. Please update employeeData.js."

            };

        }


        try {

            const result =
                EmployeeManager
                    .bulkAddEmployees(
                        records
                    );


            /*
            Add import history only if
            the function exists.
            */

            if (
                typeof EmployeeManager
                    .addImportHistory ===
                "function"
            ) {

                EmployeeManager
                    .addImportHistory({

                        fileName:
                            metadata.fileName ||
                            "",

                        sheetName:
                            metadata.sheetName ||
                            "",

                        totalRows:
                            metadata.totalRows ||
                            records.length,

                        added:
                            result.added ||
                            0,

                        updated:
                            result.updated ||
                            0,

                        failed:
                            result.failed ||
                            0

                    });

            }


            return {

                success:
                    result.success !== false,

                added:
                    result.added || 0,

                updated:
                    result.updated || 0,

                failed:
                    result.failed || 0,

                totalProcessed:
                    result.totalProcessed ||
                    records.length

            };

        }

        catch (error) {

            console.error(
                "Excel import failed:",
                error
            );


            return {

                success: false,

                added: 0,

                updated: 0,

                failed: records.length,

                totalProcessed: 0,

                message:
                    error.message

            };

        }

    },


    /*======================================================
    15. IMPORT WORKBOOK
    ======================================================*/

    importWorkbook(
        workbookData,
        fileName = ""
    ) {

        if (!workbookData) {

            return {

                success: false,

                message:
                    "No workbook data provided."

            };

        }


        const allRecords = [];

        const sheetResults = [];

        const allErrors = [];


        Object.keys(
            workbookData
        ).forEach(sheetName => {

            const result =
                this.processSheet(
                    sheetName,
                    workbookData[sheetName]
                );


            sheetResults.push(
                result
            );


            allRecords.push(
                ...result.records
            );


            allErrors.push(
                ...result.errors
            );

        });


        /*
        Check duplicate IDs
        across ALL sheets/files.
        */

        const globalUniqueCheck =
            this.validateUniqueIDs(
                allRecords
            );


        if (!globalUniqueCheck.valid) {

            globalUniqueCheck
                .duplicateIDs
                .forEach(id => {

                    allErrors.push({

                        row:
                            "Multiple Sheets",

                        employeeID:
                            id,

                        errors: [

                            "Duplicate Employee ID found across uploaded sheets."

                        ]

                    });

                });

        }


        return {

            success: true,

            fileName:
                fileName,

            totalRecords:
                allRecords.length,

            sheetResults:
                sheetResults,

            records:
                allRecords,

            errors:
                allErrors

        };

    },


    /*======================================================
    16. IMPORT PREVIEW
    ======================================================*/

    getImportPreview(
        records
    ) {

        if (!Array.isArray(records)) {

            return [];

        }


        return records.map(
            employee => ({

                employeeID:
                    employee.employeeID || "",

                employeeName:
                    employee.employeeName || "",

                designation:
                    employee.designation || "",

                department:
                    employee.department || "",

                role:
                    employee.role || "",

                currentProject:
                    employee.currentProject || "",

                currentSite:
                    employee.currentSite || "",

                employmentType:
                    employee.employmentType || "",

                reportingManager:
                    employee.reportingManager || "",

                deploymentStatus:
                    employee.deploymentStatus || "",

                status:
                    employee.status || ""

            })
        );

    },


    /*======================================================
    17. COMMIT IMPORT
    ======================================================*/

    commitImport(
        records,
        metadata = {}
    ) {

        if (
            !Array.isArray(records) ||
            records.length === 0
        ) {

            return {

                success: false,

                message:
                    "No valid employee records to import.",

                added: 0,

                updated: 0,

                failed: 0

            };

        }


        return this.importRecords(
            records,
            metadata
        );

    },


    /*======================================================
    18. IMPORT SUMMARY
    ======================================================*/

    generateSummary(
        importResult
    ) {

        if (!importResult) {

            return null;

        }


        return {

            fileName:
                importResult.fileName ||
                "",

            totalRecords:
                importResult.totalRecords ||
                0,

            validRecords:
                Array.isArray(
                    importResult.records
                )
                    ? importResult.records.length
                    : 0,

            errorRecords:
                Array.isArray(
                    importResult.errors
                )
                    ? importResult.errors.length
                    : 0,

            sheets:
                Array.isArray(
                    importResult.sheetResults
                )
                    ? importResult.sheetResults.length
                    : 0

        };

    },


    /*======================================================
    19. CLEAR IMPORT PREVIEW
    ======================================================*/

    clearPreview() {

        this.previewData = [];

        this.previewErrors = [];

    }

};


/*==========================================================
20. GLOBAL ACCESS
==========================================================*/

window.ExcelImporter =
    ExcelImporter;


/*==========================================================
21. SYSTEM READY
==========================================================*/

console.log(
    "=========================================="
);

console.log(
    "Serentica Excel Importer Loaded"
);

console.log(
    "Version:",
    ExcelImporter.version
);

console.log(
    "Multiple Excel Sheets: READY"
);

console.log(
    "Employee ID Validation: READY"
);

console.log(
    "Department Mapping: READY"
);

console.log(
    "Role Mapping: READY"
);

console.log(
    "Employment Type Mapping: READY"
);

console.log(
    "Site Mapping: READY"
);

console.log(
    "Reporting Manager Mapping: READY"
);

console.log(
    "Deployment Status Mapping: READY"
);

console.log(
    "Add / Update Logic: READY"
);

console.log(
    "HRMS Integration Compatibility: READY"
);

console.log(
    "=========================================="
);
