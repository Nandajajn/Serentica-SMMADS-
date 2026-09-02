/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
EXCEL IMPORT ENGINE
excelImporter.js

VERSION : 1.0

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

DATA FLOW:

Excel
  ↓
ExcelImporter
  ↓
Validation & Mapping
  ↓
EmployeeManager.bulkAddEmployees()
  ↓
EmployeeDatabase
==========================================================*/

"use strict";


/*==========================================================
1. EXCEL IMPORTER
==========================================================*/

const ExcelImporter = {


    /*======================================================
    CONFIGURATION
    ======================================================*/

    version: "1.0",

    supportedExtensions: [
        ".xlsx",
        ".xls"
    ],


    /*======================================================
    EXPECTED EXCEL COLUMNS
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
            "Job Title"
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
            "Onroll / Off-role",
            "Onroll/Off-role",
            "Employment Type",
            "EmploymentType"
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

        department: [
            "Department",
            "Dept"
        ],

        role: [
            "Role",
            "Employee Role"
        ],

        currentProject: [
            "Project",
            "Current Project"
        ],

        currentSite: [
            "Site",
            "Current Site"
        ]

    },


    /*======================================================
    2. NORMALIZE COLUMN NAME
    ======================================================*/

    normalizeColumnName(value) {

        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ")
            .replace(/[_-]/g, " ");

    },


    /*======================================================
    3. FIND MATCHING COLUMN
    ======================================================*/

    findColumn(headers, possibleNames) {

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
    4. DETECT COLUMN MAPPING
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
    5. CONVERT EXCEL ROW TO EMPLOYEE DATA
    ======================================================*/

    mapRowToEmployee(
        row,
        mapping,
        sheetName
    ) {

        const getValue = field => {

            const column =
                mapping[field];

            if (!column) {

                return "";

            }

            return row[column] ?? "";

        };


        /*==================================================
        DETERMINE PROJECT FROM SHEET
        ==================================================*/

        let project =
            getValue("currentProject");


        if (!project) {

            const sheet =
                String(sheetName || "")
                    .trim()
                    .toLowerCase();


            if (sheet === "wind") {

                project = "Wind";

            }

            else if (sheet === "solar") {

                project = "Solar";

            }

        }


        /*==================================================
        DETERMINE SITE
        ==================================================*/

        const site =
            getValue("currentSite") ||
            "Koppal";


        /*==================================================
        DEFAULT STATUS
        ==================================================*/

        const status =
            getValue("status") ||
            "Active";


        return {

            employeeID:
                String(
                    getValue("employeeID")
                ).trim(),

            employeeName:
                String(
                    getValue("employeeName")
                ).trim(),

            designation:
                String(
                    getValue("designation")
                ).trim(),

            phone:
                String(
                    getValue("phone")
                ).trim(),

            email:
                String(
                    getValue("email")
                ).trim(),

            employmentType:
                String(
                    getValue("employmentType")
                ).trim(),

            address:
                String(
                    getValue("address")
                ).trim(),

            status:
                status,

            currentSite:
                site,

            currentProject:
                project,

            company:
                "Serentica Renewables"

        };

    },


    /*======================================================
    6. VALIDATE ROW
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


        return {

            valid:
                errors.length === 0,

            errors:
                errors

        };

    },


    /*======================================================
    7. VALIDATE UNIQUE EMPLOYEE IDS
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
                [...new Set(duplicateIDs)]

        };

    },


    /*======================================================
    8. PROCESS SINGLE SHEET
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

                errors: []

            };

        }


        if (rows.length === 0) {

            return {

                sheetName:
                    sheetName,

                records: [],

                errors: []

            };

        }


        const headers =
            Object.keys(rows[0]);


        const mapping =
            this.detectColumnMapping(
                headers
            );


        const records = [];

        const errors = [];


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
    9. IMPORT PROCESSED RECORDS
    ======================================================*/

    importRecords(
        records,
        metadata = {}
    ) {

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

                failed: records.length

            };

        }


        const result =
            EmployeeManager.bulkAddEmployees(
                records
            );


        EmployeeManager.addImportHistory({

            fileName:
                metadata.fileName || "",

            sheetName:
                metadata.sheetName || "",

            totalRows:
                metadata.totalRows ||
                records.length,

            added:
                result.added,

            updated:
                result.updated,

            failed:
                (
                    result.failed ||
                    0
                )

        });


        return {

            success: true,

            added:
                result.added,

            updated:
                result.updated,

            failed:
                result.failed || 0,

            totalProcessed:
                result.totalProcessed

        };

    },


    /*======================================================
    10. IMPORT WORKBOOK
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


        /*
        workbookData format:

        {
            "Wind": [...rows],
            "Solar": [...rows]
        }
        */


        Object.keys(
            workbookData
        ).forEach(sheetName => {

            const result =
                this.processSheet(
                    sheetName,
                    workbookData[
                        sheetName
                    ]
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
    11. GET IMPORT PREVIEW
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
                    employee.employeeID,

                employeeName:
                    employee.employeeName,

                designation:
                    employee.designation,

                department:
                    employee.department,

                role:
                    employee.role,

                currentProject:
                    employee.currentProject,

                currentSite:
                    employee.currentSite,

                employmentType:
                    employee.employmentType,

                status:
                    employee.status

            })
        );

    },


    /*======================================================
    12. COMMIT IMPORT
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
                    "No valid employee records to import."

            };

        }


        return this.importRecords(
            records,
            metadata
        );

    },


    /*======================================================
    13. IMPORT SUMMARY
    ======================================================*/

    generateSummary(
        importResult
    ) {

        if (!importResult) {

            return null;

        }


        return {

            fileName:
                importResult.fileName || "",

            totalRecords:
                importResult.totalRecords || 0,

            validRecords:
                importResult.records
                    ? importResult.records.length
                    : 0,

            errorRecords:
                importResult.errors
                    ? importResult.errors.length
                    : 0,

            sheets:
                importResult.sheetResults
                    ? importResult.sheetResults.length
                    : 0

        };

    },


    /*======================================================
    14. CLEAR IMPORT PREVIEW
    ======================================================*/

    clearPreview() {

        this.previewData = [];

        this.previewErrors = [];

    }

};


/*==========================================================
15. GLOBAL ACCESS
==========================================================*/

window.ExcelImporter =
    ExcelImporter;


/*==========================================================
16. SYSTEM READY
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
    "Add / Update Logic: READY"
);

console.log(
    "HRMS Integration Compatibility: READY"
);

console.log(
    "=========================================="
);
