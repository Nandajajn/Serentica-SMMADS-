/* ============================================================
   SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
   AUTHENTICATION MODULE
   authentication.js — PART 1
   ============================================================ */

"use strict";


/* ============================================================
   AUTHENTICATION MANAGER
   ============================================================ */

const AuthenticationManager = {

    /* --------------------------------------------------------
       SYSTEM INFORMATION
       -------------------------------------------------------- */

    version:
        typeof CONFIG !== "undefined" &&
        CONFIG.VERSION
            ? CONFIG.VERSION
            : "1.0.0",


    /* --------------------------------------------------------
       CURRENT USER / SESSION
       -------------------------------------------------------- */

    currentUser: null,

    currentRole: null,

    sessionActive: false,


    /* --------------------------------------------------------
       INITIALIZATION STATUS
       -------------------------------------------------------- */

    initialized: false,

    initializationError: null,


    /* ========================================================
       CONFIGURATION VALIDATION
       ======================================================== */

    validateConfiguration: function () {

        if (
            typeof CONFIG === "undefined"
        ) {

            console.error(
                "AuthenticationManager: CONFIG is not available."
            );

            return false;
        }


        return true;
    },


    /* ========================================================
       DATABASE VALIDATION
       ======================================================== */

    validateDatabase: function () {

        if (
            typeof EmployeeDatabase === "undefined"
        ) {

            console.error(
                "AuthenticationManager: EmployeeDatabase is not available."
            );

            return false;
        }


        return true;
    },


    /* ========================================================
       SYSTEM VALIDATION
       ======================================================== */

    validateSystem: function () {

        const configurationReady =
            this.validateConfiguration();


        if (
            !configurationReady
        ) {

            return false;
        }


        const databaseReady =
            this.validateDatabase();


        if (
            !databaseReady
        ) {

            return false;
        }


        return true;
    },


    /* ========================================================
       STORAGE KEY HELPERS
       ======================================================== */

    getStorageKey: function (
        keyName
    ) {

        if (
            typeof CONFIG !== "undefined" &&
            CONFIG.STORAGE &&
            CONFIG.STORAGE[keyName]
        ) {

            return CONFIG.STORAGE[keyName];
        }


        return keyName;
    },


    /* ========================================================
       SAVE CURRENT USER
       ======================================================== */

    saveCurrentUser: function (
        user
    ) {

        if (
            !user
        ) {

            return false;
        }


        try {

            const userKey =
                this.getStorageKey(
                    "CURRENT_USER"
                );


            const roleKey =
                this.getStorageKey(
                    "CURRENT_ROLE"
                );


            localStorage.setItem(
                userKey,
                JSON.stringify(user)
            );


            if (
                user.role
            ) {

                localStorage.setItem(
                    roleKey,
                    user.role
                );
            }


            this.currentUser =
                user;


            this.currentRole =
                user.role || null;


            this.sessionActive =
                true;


            return true;

        }
        catch (
            error
        ) {

            console.error(
                "AuthenticationManager: Unable to save user session.",
                error
            );


            return false;
        }
    },


    /* ========================================================
       LOAD CURRENT USER
       ======================================================== */

    loadCurrentUser: function () {

        try {

            const userKey =
                this.getStorageKey(
                    "CURRENT_USER"
                );


            const roleKey =
                this.getStorageKey(
                    "CURRENT_ROLE"
                );


            const storedUser =
                localStorage.getItem(
                    userKey
                );


            const storedRole =
                localStorage.getItem(
                    roleKey
                );


            if (
                storedUser
            ) {

                this.currentUser =
                    JSON.parse(
                        storedUser
                    );
            }
            else {

                this.currentUser =
                    null;
            }


            if (
                this.currentUser
            ) {

                this.currentRole =
                    this.currentUser.role ||
                    storedRole ||
                    null;

                this.sessionActive =
                    true;
            }
            else {

                this.currentRole =
                    storedRole ||
                    null;

                this.sessionActive =
                    false;
            }


            return this.currentUser;

        }
        catch (
            error
        ) {

            console.error(
                "AuthenticationManager: Unable to load user session.",
                error
            );


            this.currentUser =
                null;

            this.currentRole =
                null;

            this.sessionActive =
                false;


            return null;
        }
    },


    /* ========================================================
       CHECK LOGIN STATUS
       ======================================================== */

    isLoggedIn: function () {

        return (
            this.sessionActive === true &&
            !!this.currentUser
        );
    },


    /* ========================================================
       GET CURRENT USER
       ======================================================== */

    getCurrentUser: function () {

        return this.currentUser;
    },


    /* ========================================================
       GET CURRENT ROLE
       ======================================================== */

    getCurrentRole: function () {

        return this.currentRole;
    }

};
/* ============================================================
   AUTHENTICATION.JS — PART 2
   USER LOOKUP, CREDENTIAL VALIDATION & LOGIN
   ============================================================ */


/* ============================================================
   FIND USER BY LOGIN ID
   ============================================================ */

AuthenticationManager.findUserByLoginId = function (
    loginId
) {

    if (
        !loginId
    ) {

        return null;
    }


    if (
        typeof EmployeeDatabase === "undefined"
    ) {

        console.error(
            "AuthenticationManager: EmployeeDatabase is unavailable."
        );

        return null;
    }


    /*
     * EmployeeDatabase.employees is the central
     * employee collection used by the system.
     */

    const employees =
        Array.isArray(
            EmployeeDatabase.employees
        )
            ? EmployeeDatabase.employees
            : [];


    const normalizedLoginId =
        String(
            loginId
        )
        .trim()
        .toLowerCase();


    return (
        employees.find(
            employee => {

                if (
                    !employee
                ) {

                    return false;
                }


                const employeeLoginId =
                    employee.loginId ||
                    employee.employeeId ||
                    employee.id ||
                    employee.username;


                if (
                    !employeeLoginId
                ) {

                    return false;
                }


                return (
                    String(
                        employeeLoginId
                    )
                    .trim()
                    .toLowerCase() ===
                    normalizedLoginId
                );

            }
        ) || null
    );

};


/* ============================================================
   NORMALIZE LOGIN INPUT
   ============================================================ */

AuthenticationManager.normalizeLoginInput =
    function (
        loginId,
        password
    ) {

        return {

            loginId:
                String(
                    loginId || ""
                )
                .trim(),

            password:
                String(
                    password || ""
                )
                .trim()

        };

    };


/* ============================================================
   VALIDATE LOGIN CREDENTIALS
   ============================================================ */

AuthenticationManager.validateCredentials =
    function (
        loginId,
        password
    ) {

        const credentials =
            this.normalizeLoginInput(
                loginId,
                password
            );


        if (
            !credentials.loginId ||
            !credentials.password
        ) {

            return {

                success: false,

                message:
                    "Login ID and password are required.",

                user: null

            };

        }


        const user =
            this.findUserByLoginId(
                credentials.loginId
            );


        if (
            !user
        ) {

            return {

                success: false,

                message:
                    "Invalid Login ID or password.",

                user: null

            };

        }


        /*
         * Password is intentionally checked against
         * the existing employee record.
         */

        const storedPassword =
            user.password;


        if (
            typeof storedPassword ===
            "undefined"
        ) {

            console.error(
                "AuthenticationManager: User has no password configured.",
                user
            );


            return {

                success: false,

                message:
                    "User authentication is not configured correctly.",

                user: null

            };

        }


        if (
            String(
                storedPassword
            ) !==
            credentials.password
        ) {

            return {

                success: false,

                message:
                    "Invalid Login ID or password.",

                user: null

            };

        }


        /*
         * Optional account-status validation.
         *
         * If the employee record contains a status,
         * inactive users should not be allowed to log in.
         */

        const accountStatus =
            user.accountStatus ||
            user.userStatus ||
            user.status;


        if (
            accountStatus
        ) {

            const normalizedStatus =
                String(
                    accountStatus
                )
                .trim()
                .toLowerCase();


            const blockedStatuses = [

                "inactive",
                "disabled",
                "blocked",
                "terminated",
                "suspended"

            ];


            if (
                blockedStatuses.includes(
                    normalizedStatus
                )
            ) {

                return {

                    success: false,

                    message:
                        "This user account is inactive.",

                    user: null

                };

            }

        }


        return {

            success: true,

            message:
                "Authentication successful.",

            user: user

        };

    };


/* ============================================================
   LOGIN
   ============================================================ */

AuthenticationManager.login =
    function (
        loginId,
        password
    ) {

        /*
         * Validate system dependencies first.
         */

        if (
            !this.validateSystem()
        ) {

            return {

                success: false,

                message:
                    "Authentication system is not ready.",

                user: null

            };

        }


        const authenticationResult =
            this.validateCredentials(
                loginId,
                password
            );


        if (
            !authenticationResult.success
        ) {

            return authenticationResult;

        }


        const user =
            authenticationResult.user;


        /*
         * Save authenticated user.
         */

        const sessionSaved =
            this.saveCurrentUser(
                user
            );


        if (
            !sessionSaved
        ) {

            return {

                success: false,

                message:
                    "Unable to create login session.",

                user: null

            };

        }


        /*
         * Return a clean result to the
         * page that initiated the login.
         */

        return {

            success: true,

            message:
                "Login successful.",

            user: user,

            role:
                this.currentRole

        };

    };


/* ============================================================
   LOGIN RESULT HELPER
   ============================================================ */

AuthenticationManager.loginAndRedirect =
    function (
        loginId,
        password
    ) {

        const result =
            this.login(
                loginId,
                password
            );


        if (
            !result.success
        ) {

            return result;

        }


        const landingPage =
            this.getRoleLandingPage(
                result.role
            );


        return {

            success: true,

            message:
                "Login successful.",

            user:
                result.user,

            role:
                result.role,

            redirect:
                landingPage

        };

    };
/* ============================================================
   AUTHENTICATION.JS — PART 3
   ROLE MANAGEMENT & PERMISSIONS
   ============================================================ */


/* ============================================================
   GET ROLE LANDING PAGE
   ============================================================ */

AuthenticationManager.getRoleLandingPage =
    function (
        role
    ) {

        /*
         * All primary site-management roles use
         * welcome.html as the central dashboard.
         */

        const pages = {

            "Admin":
                "welcome.html",

            "Project Manager":
                "welcome.html",

            "Team Lead":
                "welcome.html",

            "Executive":
                "welcome.html",

            "Employee":
                "employee.html"

        };


        /*
         * Also support role constants from CONFIG
         * when they are available.
         */

        if (
            typeof CONFIG !== "undefined" &&
            CONFIG.ROLES
        ) {

            const roleConfig =
                CONFIG.ROLES;


            if (
                roleConfig.ADMIN
            ) {

                pages[
                    roleConfig.ADMIN
                ] =
                    "welcome.html";
            }


            if (
                roleConfig.PROJECT_MANAGER
            ) {

                pages[
                    roleConfig.PROJECT_MANAGER
                ] =
                    "welcome.html";
            }


            if (
                roleConfig.LEAD
            ) {

                pages[
                    roleConfig.LEAD
                ] =
                    "welcome.html";
            }


            if (
                roleConfig.EXECUTIVE
            ) {

                pages[
                    roleConfig.EXECUTIVE
                ] =
                    "welcome.html";
            }


            if (
                roleConfig.EMPLOYEE
            ) {

                pages[
                    roleConfig.EMPLOYEE
                ] =
                    "employee.html";
            }

        }


        return (
            pages[role] ||
            "welcome.html"
        );

    };


/* ============================================================
   GET CURRENT USER PERMISSIONS
   ============================================================ */

AuthenticationManager.getCurrentPermissions =
    function () {

        if (
            !this.currentUser
        ) {

            return [];

        }


        /*
         * Prefer permissions stored directly
         * against the authenticated employee.
         */

        if (
            Array.isArray(
                this.currentUser.permissions
            )
        ) {

            return [
                ...this.currentUser.permissions
            ];

        }


        /*
         * Otherwise obtain permissions from CONFIG.
         */

        if (
            typeof CONFIG !== "undefined" &&
            CONFIG.PERMISSIONS
        ) {

            const role =
                this.currentRole;


            if (
                role &&
                CONFIG.PERMISSIONS[role]
            ) {

                const rolePermissions =
                    CONFIG.PERMISSIONS[role];


                if (
                    Array.isArray(
                        rolePermissions
                    )
                ) {

                    return [
                        ...rolePermissions
                    ];

                }


                /*
                 * If permissions are stored as
                 * an object of boolean values.
                 */

                return Object.keys(
                    rolePermissions
                )
                .filter(
                    permission =>
                        rolePermissions[
                            permission
                        ] === true
                );

            }

        }


        return [];

    };


/* ============================================================
   CHECK PERMISSION
   ============================================================ */

AuthenticationManager.hasPermission =
    function (
        permission
    ) {

        if (
            !this.isLoggedIn()
        ) {

            return false;

        }


        if (
            !permission
        ) {

            return false;

        }


        const permissions =
            this.getCurrentPermissions();


        return permissions.includes(
            permission
        );

    };


/* ============================================================
   CHECK ANY PERMISSION
   ============================================================ */

AuthenticationManager.hasAnyPermission =
    function (
        permissions
    ) {

        if (
            !Array.isArray(
                permissions
            )
        ) {

            return false;

        }


        return permissions.some(
            permission =>
                this.hasPermission(
                    permission
                )
        );

    };


/* ============================================================
   CHECK ALL PERMISSIONS
   ============================================================ */

AuthenticationManager.hasAllPermissions =
    function (
        permissions
    ) {

        if (
            !Array.isArray(
                permissions
            )
        ) {

            return false;

        }


        return permissions.every(
            permission =>
                this.hasPermission(
                    permission
                )
        );

    };


/* ============================================================
   CHECK CURRENT ROLE
   ============================================================ */

AuthenticationManager.hasRole =
    function (
        role
    ) {

        if (
            !this.isLoggedIn()
        ) {

            return false;

        }


        if (
            !role
        ) {

            return false;

        }


        return (
            this.currentRole ===
            role
        );

    };


/* ============================================================
   CHECK ANY ROLE
   ============================================================ */

AuthenticationManager.hasAnyRole =
    function (
        roles
    ) {

        if (
            !Array.isArray(
                roles
            )
        ) {

            return false;

        }


        if (
            !this.isLoggedIn()
        ) {

            return false;

        }


        return roles.includes(
            this.currentRole
        );

    };


/* ============================================================
   GET ROLE
   ============================================================ */

AuthenticationManager.getRole =
    function () {

        return (
            this.currentRole ||
            null
        );

    };


/* ============================================================
   GET USER DISPLAY NAME
   ============================================================ */

AuthenticationManager.getUserDisplayName =
    function () {

        if (
            !this.currentUser
        ) {

            return "";

        }


        return (
            this.currentUser.name ||
            this.currentUser.employeeName ||
            this.currentUser.fullName ||
            this.currentUser.loginId ||
            this.currentUser.employeeId ||
            ""
        );

    };


/* ============================================================
   GET USER EMPLOYEE ID
   ============================================================ */

AuthenticationManager.getEmployeeId =
    function () {

        if (
            !this.currentUser
        ) {

            return null;

        }


        return (
            this.currentUser.employeeId ||
            this.currentUser.id ||
            this.currentUser.loginId ||
            null
        );

    };
/* ============================================================
   AUTHENTICATION.JS — PART 4
   LOGOUT & SESSION MANAGEMENT
   ============================================================ */


/* ============================================================
   CLEAR SESSION
   ============================================================ */

AuthenticationManager.clearSession =
    function () {

        try {

            const userKey =
                this.getStorageKey(
                    "CURRENT_USER"
                );


            const roleKey =
                this.getStorageKey(
                    "CURRENT_ROLE"
                );


            const sessionKey =
                this.getStorageKey(
                    "SESSION"
                );


            /*
             * Remove authentication information.
             */

            localStorage.removeItem(
                userKey
            );


            localStorage.removeItem(
                roleKey
            );


            localStorage.removeItem(
                sessionKey
            );


            /*
             * Reset in-memory authentication state.
             */

            this.currentUser =
                null;


            this.currentRole =
                null;


            this.sessionActive =
                false;


            return true;

        }
        catch (
            error
        ) {

            console.error(
                "AuthenticationManager: Unable to clear session.",
                error
            );


            /*
             * Even if localStorage encounters an
             * issue, reset the in-memory state.
             */

            this.currentUser =
                null;


            this.currentRole =
                null;


            this.sessionActive =
                false;


            return false;
        }

    };


/* ============================================================
   LOGOUT
   ============================================================ */

AuthenticationManager.logout =
    function (
        redirect = true
    ) {

        const sessionCleared =
            this.clearSession();


        /*
         * Redirect to the login page after logout.
         */

        if (
            redirect === true
        ) {

            window.location.href =
                "index.html";

        }


        return sessionCleared;

    };


/* ============================================================
   RESTORE SESSION
   ============================================================ */

AuthenticationManager.restoreSession =
    function () {

        const user =
            this.loadCurrentUser();


        if (
            !user
        ) {

            return {

                success: false,

                user: null,

                role: null

            };

        }


        /*
         * Make sure the restored user still
         * exists in the central employee database.
         */

        const employeeId =
            user.employeeId ||
            user.id ||
            user.loginId;


        if (
            !employeeId
        ) {

            this.clearSession();


            return {

                success: false,

                user: null,

                role: null

            };

        }


        return {

            success: true,

            user:
                this.currentUser,

            role:
                this.currentRole

        };

    };


/* ============================================================
   VALIDATE ACTIVE SESSION
   ============================================================ */

AuthenticationManager.validateSession =
    function () {

        if (
            !this.isLoggedIn()
        ) {

            return false;

        }


        if (
            !this.currentUser
        ) {

            this.sessionActive =
                false;

            return false;

        }


        /*
         * A role is required for all authenticated
         * management users.
         */

        if (
            !this.currentRole
        ) {

            this.sessionActive =
                false;

            return false;

        }


        return true;

    };


/* ============================================================
   REFRESH SESSION STATE
   ============================================================ */

AuthenticationManager.refreshSession =
    function () {

        const restored =
            this.restoreSession();


        if (
            !restored.success
        ) {

            return false;

        }


        return this.validateSession();

    };


/* ============================================================
   SESSION INFORMATION
   ============================================================ */

AuthenticationManager.getSession =
    function () {

        return {

            active:
                this.sessionActive,

            user:
                this.currentUser,

            role:
                this.currentRole,

            employeeId:
                this.getEmployeeId(),

            displayName:
                this.getUserDisplayName()

        };

    };
/* ============================================================
   AUTHENTICATION.JS — PART 5
   PAGE PROTECTION & ROLE-BASED ACCESS
   ============================================================ */


/* ============================================================
   GET CURRENT PAGE NAME
   ============================================================ */

AuthenticationManager.getCurrentPage =
    function () {

        const path =
            window.location.pathname;


        let page =
            path.substring(
                path.lastIndexOf("/") + 1
            );


        /*
         * When the browser is serving the page
         * from a root location without a filename.
         */

        if (
            !page
        ) {

            page =
                "index.html";

        }


        return page.toLowerCase();

    };


/* ============================================================
   GET PAGE ACCESS RULES
   ============================================================ */

AuthenticationManager.getPageAccessRules =
    function () {

        const rules = {};


        /*
         * Main dashboard.
         */

        rules["welcome.html"] = [

            "Admin",
            "Project Manager",
            "Team Lead",
            "Executive"

        ];


        /*
         * Employee dashboard.
         */

        rules["employee.html"] = [

            "Admin",
            "Project Manager",
            "Team Lead",
            "Executive",
            "Employee"

        ];


        /*
         * Organization structure.
         */

        rules["organization.html"] = [

            "Admin",
            "Project Manager",
            "Team Lead",
            "Executive"

        ];


        /*
         * Deployment module.
         */

        rules["deploy.html"] = [

            "Admin",
            "Project Manager",
            "Team Lead"

        ];


        /*
         * Recall module.
         */

        rules["recall.html"] = [

            "Admin",
            "Project Manager",
            "Team Lead"

        ];


        return rules;

    };


/* ============================================================
   CHECK PAGE ACCESS
   ============================================================ */

AuthenticationManager.canAccessPage =
    function (
        pageName
    ) {

        if (
            !pageName
        ) {

            return false;

        }


        /*
         * Login page is always accessible.
         */

        if (
            pageName.toLowerCase() ===
            "index.html"
        ) {

            return true;

        }


        /*
         * User must be logged in for
         * protected pages.
         */

        if (
            !this.validateSession()
        ) {

            return false;

        }


        const rules =
            this.getPageAccessRules();


        const page =
            pageName
                .toLowerCase();


        /*
         * If the page has no explicit rule,
         * deny access rather than accidentally
         * exposing a protected page.
         */

        if (
            !rules[page]
        ) {

            return false;

        }


        return rules[page].includes(
            this.currentRole
        );

    };


/* ============================================================
   PROTECT CURRENT PAGE
   ============================================================ */

AuthenticationManager.protectCurrentPage =
    function () {

        const currentPage =
            this.getCurrentPage();


        /*
         * index.html does not require
         * authentication.
         */

        if (
            currentPage ===
            "index.html"
        ) {

            return true;

        }


        const accessAllowed =
            this.canAccessPage(
                currentPage
            );


        if (
            accessAllowed
        ) {

            return true;

        }


        /*
         * If the user has no valid session,
         * send them to the login page.
         */

        if (
            !this.validateSession()
        ) {

            window.location.replace(
                "index.html"
            );


            return false;

        }


        /*
         * The user is authenticated but does
         * not have permission for this page.
         */

        const landingPage =
            this.getRoleLandingPage(
                this.currentRole
            );


        if (
            currentPage !==
            landingPage
        ) {

            window.location.replace(
                landingPage
            );

        }


        return false;

    };


/* ============================================================
   CHECK PAGE BEFORE EXECUTION
   ============================================================ */

AuthenticationManager.autoProtectPage =
    function () {

        /*
         * Do not execute protection until
         * the DOM is ready.
         */

        const executeProtection =
            () => {

                /*
                 * Restore any saved session first.
                 */

                this.restoreSession();


                /*
                 * Then validate access to
                 * the current page.
                 */

                this.protectCurrentPage();

            };


        if (
            document.readyState ===
            "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                executeProtection,
                {
                    once: true
                }
            );

        }
        else {

            executeProtection();

        }

    };


/* ============================================================
   REQUIRE AUTHENTICATION
   ============================================================ */

AuthenticationManager.requireAuthentication =
    function () {

        if (
            this.validateSession()
        ) {

            return true;

        }


        window.location.replace(
            "index.html"
        );


        return false;

    };


/* ============================================================
   REQUIRE SPECIFIC ROLE
   ============================================================ */

AuthenticationManager.requireRole =
    function (
        roles
    ) {

        if (
            !this.validateSession()
        ) {

            window.location.replace(
                "index.html"
            );


            return false;

        }


        const allowedRoles =
            Array.isArray(
                roles
            )
                ? roles
                : [roles];


        if (
            allowedRoles.includes(
                this.currentRole
            )
        ) {

            return true;

        }


        const landingPage =
            this.getRoleLandingPage(
                this.currentRole
            );


        window.location.replace(
            landingPage
        );


        return false;

    };
 /* ============================================================
   AUTHENTICATION.JS — PART 6
   INITIALIZATION, LOGOUT HANDLER & HEALTH CHECK
   ============================================================ */


/* ============================================================
   INITIALIZE AUTHENTICATION SYSTEM
   ============================================================ */

AuthenticationManager.initialize =
    function () {

        /*
         * Prevent duplicate initialization.
         */

        if (
            this.initialized === true
        ) {

            return true;

        }


        /*
         * Validate required dependencies.
         */

        if (
            !this.validateSystem()
        ) {

            this.initializationError =
                "Authentication dependencies are unavailable.";

            this.initialized =
                false;

            return false;

        }


        /*
         * Restore an existing session.
         */

        this.restoreSession();


        /*
         * Connect logout controls that already
         * exist on the current page.
         */

        this.bindLogoutButtons();


        /*
         * Mark authentication system as ready.
         */

        this.initialized =
            true;


        this.initializationError =
            null;


        console.info(
            "AuthenticationManager initialized successfully."
        );


        return true;

    };


/* ============================================================
   BIND LOGOUT BUTTONS
   ============================================================ */

AuthenticationManager.bindLogoutButtons =
    function () {

        /*
         * Support both a standard ID and
         * data-auth-action attributes.
         */

        const logoutButtons =
            document.querySelectorAll(
                "#logoutBtn, " +
                "#logoutButton, " +
                "[data-auth-action='logout']"
            );


        if (
            !logoutButtons.length
        ) {

            return;

        }


        logoutButtons.forEach(
            button => {

                /*
                 * Prevent the same event from being
                 * attached multiple times.
                 */

                if (
                    button.dataset.authBound ===
                    "true"
                ) {

                    return;

                }


                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        this.logout(
                            true
                        );

                    }
                );


                button.dataset.authBound =
                    "true";

            }
        );

    };


/* ============================================================
   AUTHENTICATION HEALTH CHECK
   ============================================================ */

AuthenticationManager.healthCheck =
    function () {

        const result = {

            status:
                "healthy",

            config:
                false,

            database:
                false,

            session:
                false,

            initialized:
                this.initialized,

            errors: []

        };


        /*
         * Check CONFIG.
         */

        if (
            typeof CONFIG !==
            "undefined"
        ) {

            result.config =
                true;

        }
        else {

            result.errors.push(
                "CONFIG is unavailable."
            );

        }


        /*
         * Check EmployeeDatabase.
         */

        if (
            typeof EmployeeDatabase !==
            "undefined"
        ) {

            result.database =
                true;

        }
        else {

            result.errors.push(
                "EmployeeDatabase is unavailable."
            );

        }


        /*
         * Check current session.
         */

        result.session =
            this.validateSession();


        /*
         * Overall status.
         */

        if (
            result.errors.length > 0
        ) {

            result.status =
                "error";

        }


        return result;

    };


/* ============================================================
   GET AUTHENTICATION STATUS
   ============================================================ */

AuthenticationManager.getAuthenticationStatus =
    function () {

        return {

            initialized:
                this.initialized,

            loggedIn:
                this.isLoggedIn(),

            role:
                this.getCurrentRole(),

            employeeId:
                this.getEmployeeId(),

            displayName:
                this.getUserDisplayName(),

            session:
                this.getSession()

        };

    };


/* ============================================================
   INITIALIZATION HANDLER
   ============================================================ */

AuthenticationManager.initializeWhenReady =
    function () {

        const initialize =
            () => {

                this.initialize();

            };


        if (
            document.readyState ===
            "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                initialize,
                {
                    once: true
                }
            );

        }
        else {

            initialize();

        }

    };
/* ============================================================
   AUTHENTICATION.JS — PART 7
   FINALIZATION & GLOBAL ACCESS
   ============================================================ */


/* ============================================================
   GLOBAL AUTHENTICATION ACCESS
   ============================================================ */

/*
 * Expose the manager through window so that
 * HTML pages and other JavaScript modules can
 * access the same authentication instance.
 */

window.AuthenticationManager =
    AuthenticationManager;


/* ============================================================
   SAFE INITIALIZATION
   ============================================================ */

/*
 * Authentication initialization is intentionally
 * started only after the document is ready.
 */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            AuthenticationManager.initialize();

        },
        {
            once: true
        }
    );

}
else {

    AuthenticationManager.initialize();

}


/* ============================================================
   FINAL MODULE STATUS
   ============================================================ */

console.info(
    "Serentica Authentication Module loaded.",
    AuthenticationManager.version
);




