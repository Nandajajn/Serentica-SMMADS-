/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
AUTHENTICATION MODULE
authentication.js
Version 1.0
==========================================================*/

"use strict";

/*==========================================================
AUTHENTICATION MANAGER
==========================================================*/

const AuthenticationManager = {

    currentUser : null,

    currentRole : null,

    session : null,

    isAuthenticated : false

};


/*==========================================================
SESSION STATUS
==========================================================*/

AuthenticationManager.SESSION_STATUS = {

    ACTIVE : "Active",

    EXPIRED : "Expired",

    LOGGED_OUT : "Logged Out"

};


/*==========================================================
GET CURRENT USER
==========================================================*/

AuthenticationManager.getCurrentUser = function(){

    return this.currentUser;

};


/*==========================================================
GET CURRENT ROLE
==========================================================*/

AuthenticationManager.getCurrentRole = function(){

    return this.currentRole;

};


/*==========================================================
CHECK AUTHENTICATION
==========================================================*/

AuthenticationManager.isLoggedIn = function(){

    return this.isAuthenticated === true;

};


/*==========================================================
GET SESSION
==========================================================*/

AuthenticationManager.getSession = function(){

    return this.session;

};


/*==========================================================
CREATE SESSION OBJECT
==========================================================*/

AuthenticationManager.createSession = function(user){

    if(!user){

        console.error(

            "Cannot create session without a user."

        );

        return null;

    }

    this.session = {

        sessionID :

            "SES" + Date.now(),

        employeeID :

            user.employeeID || "",

        userName :

            user.employeeName || "",

        role :

            user.role || CONFIG.ROLES.EMPLOYEE,

        loginTime :

            new Date(),

        status :

            this.SESSION_STATUS.ACTIVE

    };

    this.currentUser = user;

    this.currentRole = this.session.role;

    this.isAuthenticated = true;

    return this.session;

};


/*==========================================================
CLEAR SESSION
==========================================================*/

AuthenticationManager.clearSession = function(){

    this.currentUser = null;

    this.currentRole = null;

    this.session = null;

    this.isAuthenticated = false;

};


/*==========================================================
SYSTEM READY
==========================================================*/

console.log(

    "Authentication Manager Loaded."

);
/*==========================================================
USER VALIDATION & LOGIN ENGINE
==========================================================*/

/*==========================================================
GET USER DATABASE
==========================================================*/

AuthenticationManager.getUserDatabase = function(){

    if(

        typeof EmployeeDatabase === "undefined" ||

        !Array.isArray(EmployeeDatabase.employees)

    ){

        console.error(

            "Employee database is unavailable."

        );

        return [];

    }

    return EmployeeDatabase.employees;

};


/*==========================================================
FIND USER
==========================================================*/

AuthenticationManager.findUser = function(

    employeeID

){

    const users = this.getUserDatabase();

    return users.find(

        user =>

            String(user.employeeID).toLowerCase() ===

            String(employeeID).toLowerCase()

    );

};


/*==========================================================
VALIDATE USER
==========================================================*/

AuthenticationManager.validateUser = function(

    employeeID

){

    if(!employeeID){

        return{

            valid:false,

            message:"Employee ID is required."

        };

    }

    const user = this.findUser(employeeID);

    if(!user){

        return{

            valid:false,

            message:"Employee ID not found."

        };

    }

    if(

        user.status &&

        user.status !== CONFIG.EMPLOYEE_STATUS.ACTIVE

    ){

        return{

            valid:false,

            message:"This employee account is not active."

        };

    }

    return{

        valid:true,

        user:user,

        message:"User validated successfully."

    };

};


/*==========================================================
VALIDATE PASSWORD
==========================================================*/

AuthenticationManager.validatePassword = function(

    user,

    password

){

    if(!user){

        return false;

    }

    if(!password){

        return false;

    }

    /*
     * DEMO AUTHENTICATION
     *
     * The current GitHub/static version does not contain
     * a secure backend authentication service.
     *
     * Therefore this function supports a temporary
     * development password field if one exists.
     *
     * Production authentication should be handled by
     * a secure backend/authentication provider.
     */

    if(user.password){

        return String(user.password) ===

            String(password);

    }

    /*
     * If no password exists in the employee data,
     * authentication remains unavailable rather than
     * silently accepting any password.
     */

    return false;

};


/*==========================================================
LOGIN
==========================================================*/

AuthenticationManager.login = function(

    employeeID,

    password,

    rememberMe=false

){

    const validation =

        this.validateUser(employeeID);

    if(!validation.valid){

        return{

            success:false,

            message:validation.message

        };

    }

    const passwordValid =

        this.validatePassword(

            validation.user,

            password

        );

    if(!passwordValid){

        return{

            success:false,

            message:"Invalid login credentials."

        };

    }

    const session =

        this.createSession(

            validation.user

        );

    if(!session){

        return{

            success:false,

            message:"Unable to create user session."

        };

    }

    if(rememberMe){

        localStorage.setItem(

            CONFIG.STORAGE.CURRENT_USER,

            JSON.stringify(validation.user)

        );

    }

    localStorage.setItem(

        CONFIG.STORAGE.CURRENT_ROLE,

        session.role

    );

    localStorage.setItem(

        CONFIG.STORAGE.SESSION,

        JSON.stringify(session)

    );

    return{

        success:true,

        message:"Login successful.",

        user:validation.user,

        role:session.role,

        session:session

    };

};


/*==========================================================
LOGIN VALIDATION RESULT
==========================================================*/

AuthenticationManager.getLoginResult = function(){

    if(!this.isLoggedIn()){

        return{

            authenticated:false,

            user:null,

            role:null,

            session:null

        };

    }

    return{

        authenticated:true,

        user:this.currentUser,

        role:this.currentRole,

        session:this.session

    };

};
/*==========================================================
ROLE-BASED ACCESS CONTROL
==========================================================*/

/*==========================================================
GET ROLE ACCESS LEVEL
==========================================================*/

AuthenticationManager.getRoleAccessLevel = function(

    role

){

    if(!role){

        return 0;

    }

    const roleKey = Object.keys(

        CONFIG.ROLES

    ).find(

        key =>

            CONFIG.ROLES[key] === role

    );

    if(!roleKey){

        return 0;

    }

    return CONFIG.ACCESS_LEVELS[roleKey] || 0;

};


/*==========================================================
GET ROLE PERMISSIONS
==========================================================*/

AuthenticationManager.getRolePermissions = function(

    role

){

    if(!role){

        return [];

    }

    const roleKey = Object.keys(

        CONFIG.ROLES

    ).find(

        key =>

            CONFIG.ROLES[key] === role

    );

    if(!roleKey){

        return [];

    }

    return CONFIG.PERMISSIONS[roleKey] || [];

};


/*==========================================================
CHECK ROLE
==========================================================*/

AuthenticationManager.hasRole = function(

    role

){

    return(

        this.isLoggedIn() &&

        this.currentRole === role

    );

};


/*==========================================================
CHECK PERMISSION
==========================================================*/

AuthenticationManager.hasPermission = function(

    permission

){

    if(!this.isLoggedIn()){

        return false;

    }

    const permissions =

        this.getRolePermissions(

            this.currentRole

        );

    return permissions.includes(

        permission

    );

};


/*==========================================================
CHECK ANY PERMISSION
==========================================================*/

AuthenticationManager.hasAnyPermission = function(

    permissions

){

    if(!Array.isArray(permissions)){

        return false;

    }

    return permissions.some(

        permission =>

            this.hasPermission(permission)

    );

};


/*==========================================================
CHECK ALL PERMISSIONS
==========================================================*/

AuthenticationManager.hasAllPermissions = function(

    permissions

){

    if(!Array.isArray(permissions)){

        return false;

    }

    return permissions.every(

        permission =>

            this.hasPermission(permission)

    );

};


/*==========================================================
CHECK MINIMUM ACCESS LEVEL
==========================================================*/

AuthenticationManager.hasMinimumAccess = function(

    requiredLevel

){

    if(!this.isLoggedIn()){

        return false;

    }

    const currentLevel =

        this.getRoleAccessLevel(

            this.currentRole

        );

    return currentLevel >= requiredLevel;

};


/*==========================================================
AUTHORIZE ACTION
==========================================================*/

AuthenticationManager.authorize = function(

    permission

){

    if(!this.isLoggedIn()){

        return{

            authorized:false,

            reason:"User is not authenticated."

        };

    }

    if(!this.hasPermission(permission)){

        return{

            authorized:false,

            reason:

                "User does not have permission: " +

                permission

        };

    }

    return{

        authorized:true,

        reason:"Access granted."

    };

};


/*==========================================================
GET CURRENT ACCESS PROFILE
==========================================================*/

AuthenticationManager.getAccessProfile = function(){

    if(!this.isLoggedIn()){

        return{

            authenticated:false,

            role:null,

            accessLevel:0,

            permissions:[]

        };

    }

    return{

        authenticated:true,

        role:this.currentRole,

        accessLevel:

            this.getRoleAccessLevel(

                this.currentRole

            ),

        permissions:

            this.getRolePermissions(

                this.currentRole

            )

    };

};
/*==========================================================
SESSION MANAGEMENT & REMEMBER ME
==========================================================*/

/*==========================================================
SAVE SESSION
==========================================================*/

AuthenticationManager.saveSession = function(){

    if(!this.session){

        return false;

    }

    try{

        localStorage.setItem(

            CONFIG.STORAGE.SESSION,

            JSON.stringify(this.session)

        );

        localStorage.setItem(

            CONFIG.STORAGE.CURRENT_ROLE,

            this.currentRole || ""

        );

        return true;

    }catch(error){

        console.error(

            "Unable to save authentication session.",

            error

        );

        return false;

    }

};


/*==========================================================
RESTORE SESSION
==========================================================*/

AuthenticationManager.restoreSession = function(){

    try{

        const storedSession =

            localStorage.getItem(

                CONFIG.STORAGE.SESSION

            );

        if(!storedSession){

            return false;

        }

        const session =

            JSON.parse(storedSession);

        if(!session){

            return false;

        }

        if(

            session.status !==

            this.SESSION_STATUS.ACTIVE

        ){

            this.clearStoredSession();

            return false;

        }

        const employee =

            this.findUser(

                session.employeeID

            );

        if(!employee){

            this.clearStoredSession();

            return false;

        }

        this.currentUser = employee;

        this.currentRole =

            session.role ||

            CONFIG.ROLES.EMPLOYEE;

        this.session = session;

        this.isAuthenticated = true;

        return true;

    }catch(error){

        console.error(

            "Unable to restore authentication session.",

            error

        );

        this.clearStoredSession();

        return false;

    }

};


/*==========================================================
CHECK REMEMBERED USER
==========================================================*/

AuthenticationManager.getRememberedUser = function(){

    try{

        const storedUser =

            localStorage.getItem(

                CONFIG.STORAGE.CURRENT_USER

            );

        if(!storedUser){

            return null;

        }

        return JSON.parse(storedUser);

    }catch(error){

        console.error(

            "Unable to read remembered user.",

            error

        );

        return null;

    }

};


/*==========================================================
SET REMEMBERED USER
==========================================================*/

AuthenticationManager.rememberUser = function(){

    if(!this.currentUser){

        return false;

    }

    try{

        localStorage.setItem(

            CONFIG.STORAGE.CURRENT_USER,

            JSON.stringify(

                this.currentUser

            )

        );

        return true;

    }catch(error){

        console.error(

            "Unable to remember user.",

            error

        );

        return false;

    }

};


/*==========================================================
REMOVE REMEMBERED USER
==========================================================*/

AuthenticationManager.forgetUser = function(){

    localStorage.removeItem(

        CONFIG.STORAGE.CURRENT_USER

    );

};


/*==========================================================
CLEAR STORED SESSION
==========================================================*/

AuthenticationManager.clearStoredSession = function(){

    localStorage.removeItem(

        CONFIG.STORAGE.SESSION

    );

    localStorage.removeItem(

        CONFIG.STORAGE.CURRENT_ROLE

    );

};


/*==========================================================
REFRESH SESSION
==========================================================*/

AuthenticationManager.refreshSession = function(){

    if(!this.isLoggedIn()){

        return false;

    }

    this.session.lastActivity =

        new Date();

    return this.saveSession();

};


/*==========================================================
GET SESSION AGE
==========================================================*/

AuthenticationManager.getSessionAge = function(){

    if(!this.session || !this.session.loginTime){

        return 0;

    }

    const loginTime =

        new Date(

            this.session.loginTime

        );

    const currentTime =

        new Date();

    return Math.floor(

        (

            currentTime - loginTime

        ) / 1000

    );

};


/*==========================================================
CHECK SESSION VALIDITY
==========================================================*/

AuthenticationManager.isSessionValid = function(){

    if(

        !this.session ||

        !this.isAuthenticated

    ){

        return false;

    }

    return(

        this.session.status ===

        this.SESSION_STATUS.ACTIVE

    );

};
/*==========================================================
LOGOUT & NAVIGATION
==========================================================*/

/*==========================================================
LOGOUT
==========================================================*/

AuthenticationManager.logout = function(

    redirect = true

){

    if(this.session){

        this.session.status =

            this.SESSION_STATUS.LOGGED_OUT;

        this.session.logoutTime =

            new Date();

    }

    this.clearSession();

    this.clearStoredSession();

    this.forgetUser();

    console.log(

        "User logged out successfully."

    );

    if(redirect){

        this.redirectToLogin();

    }

    return true;

};


/*==========================================================
REDIRECT TO LOGIN
==========================================================*/

AuthenticationManager.redirectToLogin = function(){

    const loginPage = "index.html";

    if(

        window.location.pathname.endsWith(

            loginPage

        )

    ){

        return;

    }

    window.location.href = loginPage;

};


/*==========================================================
GET ROLE LANDING PAGE
==========================================================*/

AuthenticationManager.getRoleLandingPage = function(

    role

){

    const pages = {

        [CONFIG.ROLES.ADMIN]:

            "admin.html",

        [CONFIG.ROLES.EXECUTIVE]:

            "welcome.html",

        [CONFIG.ROLES.PROJECT_MANAGER]:

            "projectManager.html",

        [CONFIG.ROLES.LEAD]:

            "lead.html",

        [CONFIG.ROLES.EMPLOYEE]:

            "employee.html"

    };

    return pages[role] || "welcome.html";

};


/*==========================================================
REDIRECT AFTER LOGIN
==========================================================*/

AuthenticationManager.redirectAfterLogin = function(){

    if(!this.isLoggedIn()){

        this.redirectToLogin();

        return false;

    }

    const destination =

        this.getRoleLandingPage(

            this.currentRole

        );

    window.location.href = destination;

    return true;

};


/*==========================================================
CHECK PAGE ACCESS
==========================================================*/

AuthenticationManager.canAccessPage = function(

    requiredRoles = []

){

    if(!this.isLoggedIn()){

        return false;

    }

    if(!Array.isArray(requiredRoles)){

        return false;

    }

    if(requiredRoles.length === 0){

        return true;

    }

    return requiredRoles.includes(

        this.currentRole

    );

};


/*==========================================================
PROTECT PAGE
==========================================================*/

AuthenticationManager.protectPage = function(

    requiredRoles = []

){

    if(!this.isLoggedIn()){

        this.redirectToLogin();

        return false;

    }

    if(

        !this.canAccessPage(

            requiredRoles

        )

    ){

        console.warn(

            "User does not have access to this page."

        );

        this.redirectAfterLogin();

        return false;

    }

    return true;

};


/*==========================================================
GET NAVIGATION MENU
==========================================================*/

AuthenticationManager.getNavigationItems = function(){

    if(!this.isLoggedIn()){

        return [];

    }

    const role = this.currentRole;

    const items = [

        {

            label:"Dashboard",

            icon:CONFIG.ICONS.DASHBOARD,

            page:"welcome.html",

            permission:null

        },

        {

            label:"Employees",

            icon:CONFIG.ICONS.EMPLOYEES,

            page:"employee.html",

            permission:"VIEW_TEAM"

        },

        {

            label:"Organisation",

            icon:CONFIG.ICONS.ORGANISATION,

            page:"organisation.html",

            permission:"VIEW_ALL"

        },

        {

            label:"Deployment",

            icon:CONFIG.ICONS.DEPLOYMENT,

            page:"deployment.html",

            permission:"VIEW_TEAM"

        },

        {

            label:"Reports",

            icon:CONFIG.ICONS.REPORT,

            page:"reports.html",

            permission:"VIEW_REPORTS"

        }

    ];

    return items.filter(item => {

        if(!item.permission){

            return true;

        }

        return this.hasPermission(

            item.permission

        );

    });

};


/*==========================================================
GET AUTHENTICATION STATE
==========================================================*/

AuthenticationManager.getAuthenticationState = function(){

    return{

        authenticated:

            this.isLoggedIn(),

        user:

            this.currentUser,

        role:

            this.currentRole,

        session:

            this.session

    };

};
/*==========================================================
PASSWORD RESET REQUEST FLOW
==========================================================*/

/*==========================================================
PASSWORD RESET STATE
==========================================================*/

AuthenticationManager.passwordResetRequests = [];


/*==========================================================
FIND USER FOR PASSWORD RESET
==========================================================*/

AuthenticationManager.findUserForPasswordReset = function(

    employeeID

){

    if(!employeeID){

        return null;

    }

    return this.findUser(employeeID);

};


/*==========================================================
CREATE PASSWORD RESET REQUEST
==========================================================*/

AuthenticationManager.createPasswordResetRequest = function(

    employeeID

){

    const user =

        this.findUserForPasswordReset(

            employeeID

        );

    if(!user){

        return{

            success:false,

            message:

                "Employee ID not found."

        };

    }


    const existingRequest =

        this.passwordResetRequests.find(

            request =>

                request.employeeID === employeeID &&

                request.status === "Pending"

        );


    if(existingRequest){

        return{

            success:false,

            message:

                "A password reset request is already pending."

        };

    }


    const request = {

        requestID:

            "PWD" + Date.now(),

        employeeID:

            user.employeeID,

        employeeName:

            user.employeeName || "",

        requestDate:

            new Date(),

        status:

            "Pending",

        completedDate:

            "",

        remarks:

            ""

    };


    this.passwordResetRequests.push(

        request

    );


    return{

        success:true,

        message:

            "Password reset request submitted successfully.",

        request:request

    };

};


/*==========================================================
GET PASSWORD RESET REQUESTS
==========================================================*/

AuthenticationManager.getPasswordResetRequests = function(){

    return this.passwordResetRequests;

};


/*==========================================================
GET PENDING PASSWORD RESET REQUESTS
==========================================================*/

AuthenticationManager.getPendingPasswordResetRequests = function(){

    return this.passwordResetRequests.filter(

        request =>

            request.status === "Pending"

    );

};


/*==========================================================
COMPLETE PASSWORD RESET REQUEST
==========================================================*/

AuthenticationManager.completePasswordResetRequest = function(

    requestID,

    remarks=""

){

    const request =

        this.passwordResetRequests.find(

            item =>

                item.requestID === requestID

        );

    if(!request){

        return{

            success:false,

            message:

                "Password reset request not found."

        };

    }


    request.status = "Completed";

    request.completedDate = new Date();

    request.remarks = remarks;


    return{

        success:true,

        message:

            "Password reset request completed.",

        request:request

    };

};


/*==========================================================
CANCEL PASSWORD RESET REQUEST
==========================================================*/

AuthenticationManager.cancelPasswordResetRequest = function(

    requestID

){

    const request =

        this.passwordResetRequests.find(

            item =>

                item.requestID === requestID

        );

    if(!request){

        return{

            success:false,

            message:

                "Password reset request not found."

        };

    }


    request.status = "Cancelled";


    return{

        success:true,

        message:

            "Password reset request cancelled.",

        request:request

    };

};


/*==========================================================
GET PASSWORD RESET STATUS
==========================================================*/

AuthenticationManager.getPasswordResetStatus = function(

    employeeID

){

    const requests =

        this.passwordResetRequests.filter(

            request =>

                request.employeeID === employeeID

        );


    if(requests.length === 0){

        return{

            requested:false,

            status:null

        };

    }


    const latestRequest =

        requests[requests.length - 1];


    return{

        requested:true,

        status:

            latestRequest.status,

        requestID:

            latestRequest.requestID,

        requestDate:

            latestRequest.requestDate

    };

};
/*==========================================================
AUTHENTICATION SECURITY & VALIDATION
==========================================================*/

/*==========================================================
LOGIN ATTEMPT TRACKING
==========================================================*/

AuthenticationManager.loginAttempts = {};


/*==========================================================
MAXIMUM LOGIN ATTEMPTS
==========================================================*/

AuthenticationManager.MAX_LOGIN_ATTEMPTS = 5;


/*==========================================================
LOGIN LOCKOUT DURATION
==========================================================*/

AuthenticationManager.LOCKOUT_DURATION =

    15 * 60 * 1000;


/*==========================================================
GET LOGIN ATTEMPT RECORD
==========================================================*/

AuthenticationManager.getLoginAttemptRecord = function(

    employeeID

){

    if(!this.loginAttempts[employeeID]){

        this.loginAttempts[employeeID] = {

            attempts:0,

            lockedUntil:null

        };

    }

    return this.loginAttempts[employeeID];

};


/*==========================================================
CHECK ACCOUNT LOCK
==========================================================*/

AuthenticationManager.isAccountLocked = function(

    employeeID

){

    const record =

        this.getLoginAttemptRecord(

            employeeID

        );

    if(!record.lockedUntil){

        return false;

    }

    const currentTime =

        new Date().getTime();

    if(

        currentTime <

        record.lockedUntil

    ){

        return true;

    }

    record.attempts = 0;

    record.lockedUntil = null;

    return false;

};


/*==========================================================
REGISTER FAILED LOGIN
==========================================================*/

AuthenticationManager.registerFailedLogin = function(

    employeeID

){

    const record =

        this.getLoginAttemptRecord(

            employeeID

        );

    record.attempts++;

    if(

        record.attempts >=

        this.MAX_LOGIN_ATTEMPTS

    ){

        record.lockedUntil =

            new Date().getTime() +

            this.LOCKOUT_DURATION;

    }

};


/*==========================================================
RESET LOGIN ATTEMPTS
==========================================================*/

AuthenticationManager.resetLoginAttempts = function(

    employeeID

){

    delete this.loginAttempts[employeeID];

};


/*==========================================================
GET REMAINING LOGIN ATTEMPTS
==========================================================*/

AuthenticationManager.getRemainingLoginAttempts = function(

    employeeID

){

    const record =

        this.getLoginAttemptRecord(

            employeeID

        );

    return Math.max(

        0,

        this.MAX_LOGIN_ATTEMPTS -

        record.attempts

    );

};


/*==========================================================
SESSION SECURITY CHECK
==========================================================*/

AuthenticationManager.performSecurityCheck = function(){

    if(!this.isLoggedIn()){

        return{

            secure:false,

            reason:

                "No authenticated session."

        };

    }

    if(!this.isSessionValid()){

        this.logout(false);

        return{

            secure:false,

            reason:

                "Session is no longer valid."

        };

    }

    if(!this.currentUser){

        this.logout(false);

        return{

            secure:false,

            reason:

                "Authenticated user information is unavailable."

        };

    }

    return{

        secure:true,

        reason:

            "Authentication security check passed."

    };

};


/*==========================================================
SANITIZE USER INPUT
==========================================================*/

AuthenticationManager.sanitizeInput = function(

    value

){

    if(value === null || value === undefined){

        return "";

    }

    return String(value)

        .trim()

        .replace(

            /[<>]/g,

            ""

        );

};


/*==========================================================
VALIDATE EMPLOYEE ID FORMAT
==========================================================*/

AuthenticationManager.validateEmployeeIDFormat = function(

    employeeID

){

    const sanitizedID =

        this.sanitizeInput(

            employeeID

        );

    if(

        sanitizedID.length <

        CONFIG.VALIDATION.EMPLOYEE_ID_MIN_LENGTH

    ){

        return false;

    }

    return true;

};


/*==========================================================
SECURE LOGIN CHECK
==========================================================*/

AuthenticationManager.secureLoginCheck = function(

    employeeID

){

    const sanitizedID =

        this.sanitizeInput(

            employeeID

        );

    if(

        !this.validateEmployeeIDFormat(

            sanitizedID

        )

    ){

        return{

            allowed:false,

            message:

                "Invalid Employee ID."

        };

    }

    if(

        this.isAccountLocked(

            sanitizedID

        )

    ){

        return{

            allowed:false,

            message:

                "Account temporarily locked due to multiple failed login attempts."

        };

    }

    return{

        allowed:true,

        employeeID:sanitizedID

    };

};


/*==========================================================
AUDIT AUTHENTICATION EVENT
==========================================================*/

AuthenticationManager.auditEvent = function(

    eventType,

    employeeID,

    description

){

    const event = {

        eventID:

            "AUTH" + Date.now(),

        eventType:

            eventType,

        employeeID:

            employeeID || "",

        description:

            description || "",

        eventDate:

            new Date()

    };


    if(

        typeof DeploymentManager !==

        "undefined" &&

        typeof DeploymentManager.addTimelineEvent ===

        "function"

    ){

        DeploymentManager.addTimelineEvent(

            "Authentication",

            employeeID || "",

            description || "",

            "System"

        );

    }


    return event;

};
/*==========================================================
AUTHENTICATION INTEGRATION
==========================================================*/

/*==========================================================
ORIGINAL LOGIN REFERENCE
==========================================================*/

AuthenticationManager.baseLogin =

    AuthenticationManager.login;


/*==========================================================
SECURE LOGIN
==========================================================*/

AuthenticationManager.loginSecure = function(

    employeeID,

    password,

    rememberMe = false

){

    const securityCheck =

        this.secureLoginCheck(

            employeeID

        );


    if(!securityCheck.allowed){

        this.auditEvent(

            "LOGIN_BLOCKED",

            employeeID,

            securityCheck.message

        );

        return{

            success:false,

            message:

                securityCheck.message

        };

    }


    const sanitizedID =

        securityCheck.employeeID;


    const validation =

        this.validateUser(

            sanitizedID

        );


    if(!validation.valid){

        this.registerFailedLogin(

            sanitizedID

        );

        this.auditEvent(

            "LOGIN_FAILED",

            sanitizedID,

            validation.message

        );

        return{

            success:false,

            message:

                validation.message,

            remainingAttempts:

                this.getRemainingLoginAttempts(

                    sanitizedID

                )

        };

    }


    const passwordValid =

        this.validatePassword(

            validation.user,

            password

        );


    if(!passwordValid){

        this.registerFailedLogin(

            sanitizedID

        );

        this.auditEvent(

            "LOGIN_FAILED",

            sanitizedID,

            "Invalid login credentials."

        );

        return{

            success:false,

            message:

                "Invalid login credentials.",

            remainingAttempts:

                this.getRemainingLoginAttempts(

                    sanitizedID

                )

        };

    }


    const session =

        this.createSession(

            validation.user

        );


    if(!session){

        return{

            success:false,

            message:

                "Unable to create user session."

        };

    }


    this.resetLoginAttempts(

        sanitizedID

    );


    if(rememberMe){

        this.rememberUser();

    }else{

        this.forgetUser();

    }


    this.saveSession();


    this.auditEvent(

        "LOGIN_SUCCESS",

        sanitizedID,

        "User logged in successfully."

    );


    return{

        success:true,

        message:"Login successful.",

        user:validation.user,

        role:this.currentRole,

        session:this.session,

        redirect:

            this.getRoleLandingPage(

                this.currentRole

            )

    };

};


/*==========================================================
INITIAL SESSION RESTORATION
==========================================================*/

AuthenticationManager.initializeSession = function(){

    const restored =

        this.restoreSession();


    if(restored){

        const securityCheck =

            this.performSecurityCheck();


        if(!securityCheck.secure){

            this.logout(false);

            return false;

        }


        this.refreshSession();

        return true;

    }


    return false;

};


/*==========================================================
PAGE AUTHENTICATION CHECK
==========================================================*/

AuthenticationManager.initializeProtectedPage = function(

    requiredRoles = []

){

    const authenticated =

        this.initializeSession();


    if(!authenticated){

        this.redirectToLogin();

        return false;

    }


    if(

        requiredRoles.length > 0 &&

        !this.canAccessPage(

            requiredRoles

        )

    ){

        this.redirectAfterLogin();

        return false;

    }


    return true;

};


/*==========================================================
AUTHENTICATION EVENT HANDLER
==========================================================*/

AuthenticationManager.handleLoginResult = function(

    result

){

    if(!result){

        return false;

    }


    if(result.success){

        this.auditEvent(

            "AUTHENTICATION_SUCCESS",

            result.user ?

                result.user.employeeID :

                "",

            "Authentication completed successfully."

        );

        return true;

    }


    return false;

};


/*==========================================================
GET USER DISPLAY INFORMATION
==========================================================*/

AuthenticationManager.getUserDisplayInformation = function(){

    if(!this.isLoggedIn()){

        return{

            name:"Guest",

            employeeID:"",

            role:"",

            department:"",

            site:"",

            authenticated:false

        };

    }


    const user =

        this.currentUser;


    return{

        name:

            user.employeeName ||

            user.name ||

            "User",

        employeeID:

            user.employeeID ||

            "",

        role:

            this.currentRole ||

            "",

        department:

            user.department ||

            "",

        site:

            user.site ||

            "",

        authenticated:true

    };

};


/*==========================================================
AUTHENTICATION DASHBOARD DATA
==========================================================*/

AuthenticationManager.getAuthenticationDashboardData = function(){

    const profile =

        this.getUserDisplayInformation();


    const access =

        this.getAccessProfile();


    return{

        profile:profile,

        access:access,

        sessionAge:

            this.getSessionAge(),

        sessionValid:

            this.isSessionValid(),

        navigation:

            this.getNavigationItems()

    };

};


/*==========================================================
AUTHENTICATION INTEGRATION STATUS
==========================================================*/

AuthenticationManager.getIntegrationStatus = function(){

    return{

        configuration:

            typeof CONFIG !== "undefined",

        employeeDatabase:

            typeof EmployeeDatabase !== "undefined",

        deploymentManager:

            typeof DeploymentManager !== "undefined",

        authenticated:

            this.isLoggedIn(),

        currentRole:

            this.currentRole,

        sessionValid:

            this.isSessionValid()

    };

};


/*==========================================================
INTEGRATION READY
==========================================================*/

console.log(

    "Authentication Integration Loaded."

);
/*==========================================================
FINAL INITIALIZATION & AUTHENTICATION STARTUP
==========================================================*/

/*==========================================================
AUTHENTICATION VALIDATION
==========================================================*/

AuthenticationManager.validateSystem = function(){

    const requiredModules = [

        "CONFIG",

        "EmployeeDatabase"

    ];


    for(const module of requiredModules){

        if(

            typeof window[module] ===

            "undefined"

        ){

            console.error(

                "Authentication dependency missing: " +

                module

            );

            return false;

        }

    }


    return true;

};


/*==========================================================
INITIALIZE AUTHENTICATION MANAGER
==========================================================*/

AuthenticationManager.initialize = function(){

    if(!this.validateSystem()){

        console.error(

            "Authentication Manager initialization failed."

        );

        return false;

    }


    console.log(

        "Initializing Authentication Manager..."

    );


    this.initializeSession();


    console.log(

        "Authentication Manager initialized successfully."

    );


    return true;

};


/*==========================================================
PROTECT CURRENT PAGE
==========================================================*/

AuthenticationManager.autoProtectPage = function(){

    const page =

        window.location.pathname

            .split("/")

            .pop()

            .toLowerCase();


    const pageRoles = {

        "admin.html":[

            CONFIG.ROLES.ADMIN

        ],

        "projectmanager.html":[

            CONFIG.ROLES.PROJECT_MANAGER,

            CONFIG.ROLES.ADMIN

        ],

        "lead.html":[

            CONFIG.ROLES.LEAD,

            CONFIG.ROLES.PROJECT_MANAGER,

            CONFIG.ROLES.ADMIN

        ],

        "employee.html":[

            CONFIG.ROLES.EMPLOYEE,

            CONFIG.ROLES.LEAD,

            CONFIG.ROLES.PROJECT_MANAGER,

            CONFIG.ROLES.ADMIN

        ],

        "deployment.html":[

            CONFIG.ROLES.LEAD,

            CONFIG.ROLES.PROJECT_MANAGER,

            CONFIG.ROLES.ADMIN

        ],

        "reports.html":[

            CONFIG.ROLES.EXECUTIVE,

            CONFIG.ROLES.PROJECT_MANAGER,

            CONFIG.ROLES.ADMIN

        ]

    };


    if(!pageRoles[page]){

        return true;

    }


    return this.initializeProtectedPage(

        pageRoles[page]

    );

};


/*==========================================================
AUTHENTICATION HEALTH CHECK
==========================================================*/

AuthenticationManager.healthCheck = function(){

    return{

        module:

            "Authentication Manager",

        version:

            CONFIG.VERSION,

        initialized:

            true,

        authenticated:

            this.isLoggedIn(),

        sessionValid:

            this.isSessionValid(),

        currentRole:

            this.currentRole,

        integration:

            this.getIntegrationStatus()

    };

};


/*==========================================================
AUTHENTICATION SYSTEM INFORMATION
==========================================================*/

AuthenticationManager.getSystemInformation = function(){

    return{

        module:

            "Authentication Manager",

        version:

            CONFIG.VERSION,

        company:

            CONFIG.COMPANY_NAME,

        application:

            CONFIG.APPLICATION_NAME,

        authenticationStatus:

            this.isLoggedIn()

                ? "Authenticated"

                : "Not Authenticated",

        currentRole:

            this.currentRole || "None"

    };

};


/*==========================================================
GLOBAL AUTHENTICATION INSTANCE
==========================================================*/

window.AuthenticationManager =

    AuthenticationManager;


/*==========================================================
AUTO INITIALIZATION
==========================================================*/

window.addEventListener(

    "load",

    function(){

        AuthenticationManager.initialize();

    }

);


/*==========================================================
SYSTEM READY MESSAGE
==========================================================*/

console.log(

    "========================================"

);

console.log(

    "Serentica Renewables"

);

console.log(

    "Authentication Manager"

);

console.log(

    "Version : " + CONFIG.VERSION

);

console.log(

    "Status : Ready"

);

console.log(

    "========================================"

);
