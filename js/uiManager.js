/*==========================================================
SERENTICA SITE MANPOWER MANAGEMENT SYSTEM
UI MANAGER
uiManager.js
Version 1.0
==========================================================*/

"use strict";

/*==========================================================
UI MANAGER
==========================================================*/

const UIManager = {

    initialized : false,

    currentPage : "",

    notifications : [],

    modals : [],

    toasts : []

};


/*==========================================================
GET CURRENT PAGE
==========================================================*/

UIManager.getCurrentPage = function(){

    return window.location.pathname

        .split("/")

        .pop()

        .toLowerCase();

};


/*==========================================================
GET ELEMENT
==========================================================*/

UIManager.getElement = function(

    selector

){

    if(!selector){

        return null;

    }

    return document.querySelector(

        selector

    );

};


/*==========================================================
GET ALL ELEMENTS
==========================================================*/

UIManager.getElements = function(

    selector

){

    if(!selector){

        return [];

    }

    return Array.from(

        document.querySelectorAll(

            selector

        )

    );

};


/*==========================================================
SET TEXT
==========================================================*/

UIManager.setText = function(

    selector,

    value

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    element.textContent =

        value ?? "";

    return true;

};


/*==========================================================
SET HTML
==========================================================*/

UIManager.setHTML = function(

    selector,

    html

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    element.innerHTML =

        html ?? "";

    return true;

};


/*==========================================================
SHOW ELEMENT
==========================================================*/

UIManager.show = function(

    selector

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    element.style.display = "";

    element.removeAttribute(

        "hidden"

    );

    return true;

};


/*==========================================================
HIDE ELEMENT
==========================================================*/

UIManager.hide = function(

    selector

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    element.style.display = "none";

    return true;

};


/*==========================================================
TOGGLE ELEMENT
==========================================================*/

UIManager.toggle = function(

    selector

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    const hidden =

        window.getComputedStyle(

            element

        ).display === "none";

    if(hidden){

        this.show(selector);

    }else{

        this.hide(selector);

    }

    return true;

};


/*==========================================================
ADD CLASS
==========================================================*/

UIManager.addClass = function(

    selector,

    className

){

    const element =

        this.getElement(selector);

    if(!element || !className){

        return false;

    }

    element.classList.add(

        className

    );

    return true;

};


/*==========================================================
REMOVE CLASS
==========================================================*/

UIManager.removeClass = function(

    selector,

    className

){

    const element =

        this.getElement(selector);

    if(!element || !className){

        return false;

    }

    element.classList.remove(

        className

    );

    return true;

};


/*==========================================================
TOGGLE CLASS
==========================================================*/

UIManager.toggleClass = function(

    selector,

    className

){

    const element =

        this.getElement(selector);

    if(!element || !className){

        return false;

    }

    element.classList.toggle(

        className

    );

    return true;

};


/*==========================================================
SET ATTRIBUTE
==========================================================*/

UIManager.setAttribute = function(

    selector,

    attribute,

    value

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    element.setAttribute(

        attribute,

        value

    );

    return true;

};


/*==========================================================
REMOVE ATTRIBUTE
==========================================================*/

UIManager.removeAttribute = function(

    selector,

    attribute

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    element.removeAttribute(

        attribute

    );

    return true;

};


/*==========================================================
SET INPUT VALUE
==========================================================*/

UIManager.setValue = function(

    selector,

    value

){

    const element =

        this.getElement(selector);

    if(!element){

        return false;

    }

    element.value =

        value ?? "";

    return true;

};


/*==========================================================
GET INPUT VALUE
==========================================================*/

UIManager.getValue = function(

    selector

){

    const element =

        this.getElement(selector);

    if(!element){

        return "";

    }

    return element.value;

};


/*==========================================================
UI INITIALIZATION
==========================================================*/

UIManager.initialize = function(){

    this.currentPage =

        this.getCurrentPage();

    this.initialized = true;

    console.log(

        "UI Manager initialized."

    );

};


/*==========================================================
GLOBAL INSTANCE
==========================================================*/

window.UIManager = UIManager;
/*==========================================================
NOTIFICATIONS, TOASTS & USER FEEDBACK
==========================================================*/

/*==========================================================
TOAST CONTAINER
==========================================================*/

UIManager.getToastContainer = function(){

    let container =

        document.querySelector(

            "#toast-container"

        );

    if(container){

        return container;

    }


    container =

        document.createElement(

            "div"

        );

    container.id =

        "toast-container";

    container.className =

        "toast-container";


    container.style.position =

        "fixed";

    container.style.top =

        "20px";

    container.style.right =

        "20px";

    container.style.zIndex =

        "99999";


    document.body.appendChild(

        container

    );


    return container;

};


/*==========================================================
SHOW TOAST
==========================================================*/

UIManager.showToast = function(

    message,

    type = "info",

    duration = CONFIG.UI.TOAST_DURATION

){

    if(!message){

        return null;

    }


    const container =

        this.getToastContainer();


    const toast =

        document.createElement(

            "div"

        );


    toast.className =

        "serentica-toast " +

        "serentica-toast-" +

        type;


    toast.textContent =

        message;


    toast.style.background =

        CONFIG.THEME.CARD;

    toast.style.color =

        CONFIG.THEME.TEXT;

    toast.style.borderLeft =

        "4px solid " +

        this.getStatusColor(type);

    toast.style.padding =

        "12px 16px";

    toast.style.marginBottom =

        "10px";

    toast.style.borderRadius =

        CONFIG.THEME.RADIUS.MEDIUM;

    toast.style.boxShadow =

        CONFIG.THEME.SHADOW.MEDIUM;


    container.appendChild(

        toast

    );


    this.toasts.push(toast);


    setTimeout(

        () => {

            toast.remove();

            this.toasts =

                this.toasts.filter(

                    item => item !== toast

                );

        },

        duration

    );


    return toast;

};


/*==========================================================
STATUS COLOR
==========================================================*/

UIManager.getStatusColor = function(

    type

){

    const colors = {

        success:

            CONFIG.THEME.STATUS.SUCCESS,

        warning:

            CONFIG.THEME.STATUS.WARNING,

        error:

            CONFIG.THEME.STATUS.DANGER,

        danger:

            CONFIG.THEME.STATUS.DANGER,

        info:

            CONFIG.THEME.STATUS.INFO,

        neutral:

            CONFIG.THEME.STATUS.NEUTRAL

    };


    return colors[type] ||

        CONFIG.THEME.STATUS.INFO;

};


/*==========================================================
SUCCESS MESSAGE
==========================================================*/

UIManager.success = function(

    message

){

    return this.showToast(

        message,

        "success"

    );

};


/*==========================================================
ERROR MESSAGE
==========================================================*/

UIManager.error = function(

    message

){

    return this.showToast(

        message,

        "error"

    );

};


/*==========================================================
WARNING MESSAGE
==========================================================*/

UIManager.warning = function(

    message

){

    return this.showToast(

        message,

        "warning"

    );

};


/*==========================================================
INFO MESSAGE
==========================================================*/

UIManager.info = function(

    message

){

    return this.showToast(

        message,

        "info"

    );

};


/*==========================================================
CLEAR ALL TOASTS
==========================================================*/

UIManager.clearToasts = function(){

    this.toasts.forEach(

        toast => toast.remove()

    );


    this.toasts = [];

};


/*==========================================================
CREATE NOTIFICATION
==========================================================*/

UIManager.createNotification = function({

    title = "Notification",

    message = "",

    type = "info",

    employeeID = "",

    action = null

} = {}){


    const notification = {

        id :

            "NOT" +

            Date.now(),

        title :

            title,

        message :

            message,

        type :

            type,

        employeeID :

            employeeID,

        action :

            action,

        createdAt :

            new Date(),

        read :

            false

    };


    this.notifications.push(

        notification

    );


    this.saveNotifications();


    return notification;

};


/*==========================================================
GET NOTIFICATIONS
==========================================================*/

UIManager.getNotifications = function(){

    return [

        ...this.notifications

    ];

};


/*==========================================================
GET UNREAD NOTIFICATIONS
==========================================================*/

UIManager.getUnreadNotifications = function(){

    return this.notifications.filter(

        notification =>

            notification.read === false

    );

};


/*==========================================================
GET UNREAD COUNT
==========================================================*/

UIManager.getUnreadNotificationCount = function(){

    return this.getUnreadNotifications()

        .length;

};


/*==========================================================
MARK NOTIFICATION AS READ
==========================================================*/

UIManager.markNotificationRead = function(

    notificationID

){

    const notification =

        this.notifications.find(

            item =>

                item.id === notificationID

        );


    if(!notification){

        return false;

    }


    notification.read = true;


    this.saveNotifications();


    return true;

};


/*==========================================================
MARK ALL NOTIFICATIONS AS READ
==========================================================*/

UIManager.markAllNotificationsRead = function(){

    this.notifications.forEach(

        notification => {

            notification.read = true;

        }

    );


    this.saveNotifications();


    return true;

};


/*==========================================================
SAVE NOTIFICATIONS
==========================================================*/

UIManager.saveNotifications = function(){

    try{

        localStorage.setItem(

            CONFIG.STORAGE.NOTIFICATIONS,

            JSON.stringify(

                this.notifications

            )

        );


        return true;

    }catch(error){

        console.error(

            "Unable to save notifications.",

            error

        );


        return false;

    }

};


/*==========================================================
LOAD NOTIFICATIONS
==========================================================*/

UIManager.loadNotifications = function(){

    try{

        const stored =

            localStorage.getItem(

                CONFIG.STORAGE.NOTIFICATIONS

            );


        if(!stored){

            this.notifications = [];

            return [];

        }


        this.notifications =

            JSON.parse(stored) || [];


        return this.notifications;

    }catch(error){

        console.error(

            "Unable to load notifications.",

            error

        );


        this.notifications = [];

        return [];

    }

};


/*==========================================================
CONFIRMATION MESSAGE
==========================================================*/

UIManager.confirmAction = function(

    message,

    onConfirm,

    onCancel = null

){

    const confirmed =

        window.confirm(

            message

        );


    if(confirmed){

        if(

            typeof onConfirm ===

            "function"

        ){

            onConfirm();

        }

        return true;

    }


    if(

        typeof onCancel ===

        "function"

    ){

        onCancel();

    }


    return false;

};


/*==========================================================
LOAD NOTIFICATIONS DURING INITIALIZATION
==========================================================*/

UIManager.loadNotifications();
/*==========================================================
MODAL MANAGEMENT
==========================================================*/

/*==========================================================
CREATE MODAL
==========================================================*/

UIManager.createModal = function({

    id = "",

    title = "Modal",

    content = "",

    size = "medium",

    closeButton = true,

    footer = ""

} = {}){

    if(!id){

        id =

            "modal-" +

            Date.now();

    }


    const existing =

        document.getElementById(id);


    if(existing){

        existing.remove();

    }


    const modal =

        document.createElement("div");


    modal.id = id;

    modal.className =

        "serentica-modal-overlay";


    modal.innerHTML = `

        <div class="serentica-modal serentica-modal-${size}">

            <div class="serentica-modal-header">

                <h3>

                    ${title}

                </h3>

                ${
                    closeButton

                    ? `

                    <button

                        type="button"

                        class="serentica-modal-close"

                        data-modal-close="${id}"

                        aria-label="Close"

                    >

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                    `

                    : ""

                }

            </div>


            <div class="serentica-modal-body">

                ${content}

            </div>


            <div class="serentica-modal-footer">

                ${footer}

            </div>

        </div>

    `;


    document.body.appendChild(

        modal

    );


    this.modals.push({

        id:id,

        element:modal

    });


    this.attachModalEvents(

        modal

    );


    return modal;

};


/*==========================================================
OPEN MODAL
==========================================================*/

UIManager.openModal = function(

    modalID

){

    const modal =

        document.getElementById(

            modalID

        );


    if(!modal){

        return false;

    }


    modal.style.display =

        "flex";


    modal.classList.add(

        "active"

    );


    document.body.classList.add(

        "modal-open"

    );


    return true;

};


/*==========================================================
CLOSE MODAL
==========================================================*/

UIManager.closeModal = function(

    modalID

){

    const modal =

        document.getElementById(

            modalID

        );


    if(!modal){

        return false;

    }


    modal.classList.remove(

        "active"

    );


    modal.style.display =

        "none";


    document.body.classList.remove(

        "modal-open"

    );


    return true;

};


/*==========================================================
REMOVE MODAL
==========================================================*/

UIManager.removeModal = function(

    modalID

){

    const modal =

        document.getElementById(

            modalID

        );


    if(modal){

        modal.remove();

    }


    this.modals =

        this.modals.filter(

            modal =>

                modal.id !== modalID

        );


    return true;

};


/*==========================================================
CLOSE ALL MODALS
==========================================================*/

UIManager.closeAllModals = function(){

    this.modals.forEach(

        modal => {

            if(modal.element){

                modal.element.remove();

            }

        }

    );


    this.modals = [];


    document.body.classList.remove(

        "modal-open"

    );

};


/*==========================================================
ATTACH MODAL EVENTS
==========================================================*/

UIManager.attachModalEvents = function(

    modal

){

    if(!modal){

        return;

    }


    const closeButtons =

        modal.querySelectorAll(

            "[data-modal-close]"

        );


    closeButtons.forEach(

        button => {

            button.addEventListener(

                "click",

                () => {

                    const modalID =

                        button.getAttribute(

                            "data-modal-close"

                        );


                    this.closeModal(

                        modalID

                    );

                }

            );

        }

    );


    modal.addEventListener(

        "click",

        event => {

            if(

                event.target ===

                modal

            ){

                this.closeModal(

                    modal.id

                );

            }

        }

    );

};


/*==========================================================
ESCAPE KEY MODAL CLOSE
==========================================================*/

UIManager.enableEscapeToCloseModals = function(){

    document.addEventListener(

        "keydown",

        event => {

            if(

                event.key !==

                "Escape"

            ){

                return;

            }


            const activeModal =

                document.querySelector(

                    ".serentica-modal-overlay.active"

                );


            if(activeModal){

                this.closeModal(

                    activeModal.id

                );

            }

        }

    );

};


/*==========================================================
UPDATE MODAL CONTENT
==========================================================*/

UIManager.updateModalContent = function(

    modalID,

    content

){

    const modal =

        document.getElementById(

            modalID

        );


    if(!modal){

        return false;

    }


    const body =

        modal.querySelector(

            ".serentica-modal-body"

        );


    if(!body){

        return false;

    }


    body.innerHTML =

        content ?? "";


    return true;

};


/*==========================================================
UPDATE MODAL TITLE
==========================================================*/

UIManager.updateModalTitle = function(

    modalID,

    title

){

    const modal =

        document.getElementById(

            modalID

        );


    if(!modal){

        return false;

    }


    const heading =

        modal.querySelector(

            ".serentica-modal-header h3"

        );


    if(!heading){

        return false;

    }


    heading.textContent =

        title ?? "";


    return true;

};


/*==========================================================
ENABLE ESCAPE CLOSE
==========================================================*/

UIManager.enableEscapeToCloseModals();
/*==========================================================
LOADING STATES & PROGRESS INDICATORS
==========================================================*/

/*==========================================================
CREATE LOADING OVERLAY
==========================================================*/

UIManager.showLoading = function({

    message = "Loading...",

    target = null

} = {}){

    let container;


    if(target){

        container =

            typeof target === "string"

                ? this.getElement(target)

                : target;

    }


    if(!container){

        container = document.body;

    }


    const existing =

        container.querySelector(

            ":scope > .serentica-loading"

        );


    if(existing){

        return existing;

    }


    const loader =

        document.createElement("div");


    loader.className =

        "serentica-loading";


    loader.innerHTML = `

        <div class="serentica-loading-content">

            <div class="serentica-spinner">

                <span></span>

                <span></span>

                <span></span>

            </div>


            <div class="serentica-loading-message">

                ${message}

            </div>

        </div>

    `;


    if(container === document.body){

        loader.style.position =

            "fixed";

        loader.style.inset = "0";

        loader.style.zIndex =

            "99998";

    }else{

        loader.style.position =

            "absolute";

        loader.style.inset = "0";

        container.style.position =

            "relative";

    }


    container.appendChild(

        loader

    );


    return loader;

};


/*==========================================================
HIDE LOADING
==========================================================*/

UIManager.hideLoading = function(

    target = null

){

    let container;


    if(target){

        container =

            typeof target === "string"

                ? this.getElement(target)

                : target;

    }


    if(!container){

        container = document.body;

    }


    const loader =

        container.querySelector(

            ":scope > .serentica-loading"

        );


    if(!loader){

        return false;

    }


    loader.remove();

    return true;

};


/*==========================================================
UPDATE LOADING MESSAGE
==========================================================*/

UIManager.updateLoadingMessage = function(

    message,

    target = null

){

    let container;


    if(target){

        container =

            typeof target === "string"

                ? this.getElement(target)

                : target;

    }


    if(!container){

        container = document.body;

    }


    const loader =

        container.querySelector(

            ":scope > .serentica-loading"

        );


    if(!loader){

        return false;

    }


    const messageElement =

        loader.querySelector(

            ".serentica-loading-message"

        );


    if(!messageElement){

        return false;

    }


    messageElement.textContent =

        message || "Loading...";


    return true;

};


/*==========================================================
DISABLE BUTTON
==========================================================*/

UIManager.setButtonLoading = function(

    button,

    loading = true,

    loadingText = "Processing..."

){

    const element =

        typeof button === "string"

            ? this.getElement(button)

            : button;


    if(!element){

        return false;

    }


    if(loading){

        if(

            !element.dataset.originalText

        ){

            element.dataset.originalText =

                element.innerHTML;

        }


        element.disabled = true;


        element.innerHTML = `

            <span class="button-spinner"></span>

            ${loadingText}

        `;

    }else{

        element.disabled = false;


        if(

            element.dataset.originalText

        ){

            element.innerHTML =

                element.dataset.originalText;

        }

    }


    return true;

};


/*==========================================================
SHOW PROGRESS BAR
==========================================================*/

UIManager.showProgress = function({

    selector = "",

    value = 0,

    label = "",

    showPercentage = true

} = {}){

    const container =

        selector

            ? this.getElement(selector)

            : null;


    if(!container){

        return false;

    }


    const percentage = Math.min(

        100,

        Math.max(

            0,

            Number(value) || 0

        )

    );


    container.innerHTML = `

        <div class="serentica-progress-wrapper">

            ${
                label

                    ? `<div class="serentica-progress-label">

                        <span>${label}</span>

                        ${
                            showPercentage

                                ? `<span>

                                    ${percentage}%

                                   </span>`

                                : ""

                        }

                    </div>`

                    : ""

            }


            <div class="serentica-progress-track">

                <div

                    class="serentica-progress-bar"

                    style="width:${percentage}%"

                ></div>

            </div>

        </div>

    `;


    return true;

};


/*==========================================================
UPDATE PROGRESS BAR
==========================================================*/

UIManager.updateProgress = function(

    selector,

    value

){

    const container =

        this.getElement(selector);


    if(!container){

        return false;

    }


    const percentage = Math.min(

        100,

        Math.max(

            0,

            Number(value) || 0

        )

    );


    const bar =

        container.querySelector(

            ".serentica-progress-bar"

        );


    if(bar){

        bar.style.width =

            percentage + "%";

    }


    const percentageText =

        container.querySelector(

            ".serentica-progress-label span:last-child"

        );


    if(percentageText){

        percentageText.textContent =

            percentage + "%";

    }


    return true;

};


/*==========================================================
SET PAGE LOADING STATE
==========================================================*/

UIManager.setPageLoading = function(

    loading,

    message = "Loading page..."

){

    if(loading){

        document.body.classList.add(

            "page-loading"

        );

        this.showLoading({

            message:message

        });

    }else{

        document.body.classList.remove(

            "page-loading"

        );

        this.hideLoading();

    }

};


/*==========================================================
ASYNC ACTION WRAPPER
==========================================================*/

UIManager.withLoading = async function(

    action,

    options = {}

){

    this.showLoading(options);


    try{

        const result =

            await action();


        return result;

    }catch(error){

        console.error(

            "UI action failed:",

            error

        );


        throw error;

    }finally{

        this.hideLoading(

            options.target || null

        );

    }

};
/*==========================================================
FORM & TABLE UTILITIES
==========================================================*/

/*==========================================================
GET FORM DATA
==========================================================*/

UIManager.getFormData = function(

    form

){

    const element =

        typeof form === "string"

            ? this.getElement(form)

            : form;


    if(!element){

        return {};

    }


    const formData =

        new FormData(element);


    const data = {};


    formData.forEach(

        (value, key) => {

            data[key] = value;

        }

    );


    return data;

};


/*==========================================================
SET FORM DATA
==========================================================*/

UIManager.setFormData = function(

    form,

    data = {}

){

    const element =

        typeof form === "string"

            ? this.getElement(form)

            : form;


    if(!element){

        return false;

    }


    Object.entries(data).forEach(

        ([key, value]) => {

            const field =

                element.querySelector(

                    `[name="${key}"]`

                );


            if(!field){

                return;

            }


            if(field.type === "checkbox"){

                field.checked =

                    Boolean(value);

            }else if(

                field.type === "radio"

            ){

                field.checked =

                    field.value ===

                    String(value);

            }else{

                field.value =

                    value ?? "";

            }

        }

    );


    return true;

};


/*==========================================================
RESET FORM
==========================================================*/

UIManager.resetForm = function(

    form

){

    const element =

        typeof form === "string"

            ? this.getElement(form)

            : form;


    if(!element){

        return false;

    }


    if(

        typeof element.reset ===

        "function"

    ){

        element.reset();

    }


    return true;

};


/*==========================================================
VALIDATE FORM
==========================================================*/

UIManager.validateForm = function(

    form

){

    const element =

        typeof form === "string"

            ? this.getElement(form)

            : form;


    if(!element){

        return{

            valid:false,

            errors:[

                "Form not found."

            ]

        };

    }


    const errors = [];


    const fields =

        element.querySelectorAll(

            "[required]"

        );


    fields.forEach(

        field => {

            if(!field.value.trim()){

                errors.push({

                    field:

                        field.name ||

                        field.id,

                    message:

                        "This field is required."

                });

            }

        }

    );


    return{

        valid:

            errors.length === 0,

        errors:errors

    };

};


/*==========================================================
CLEAR FORM ERRORS
==========================================================*/

UIManager.clearFormErrors = function(

    form

){

    const element =

        typeof form === "string"

            ? this.getElement(form)

            : form;


    if(!element){

        return false;

    }


    element

        .querySelectorAll(

            ".form-error"

        )

        .forEach(

            error => error.remove()

        );


    element

        .querySelectorAll(

            ".input-error"

        )

        .forEach(

            field =>

                field.classList.remove(

                    "input-error"

                )

        );


    return true;

};


/*==========================================================
DISPLAY FORM ERRORS
==========================================================*/

UIManager.displayFormErrors = function(

    form,

    errors = []

){

    const element =

        typeof form === "string"

            ? this.getElement(form)

            : form;


    if(!element){

        return false;

    }


    this.clearFormErrors(

        element

    );


    errors.forEach(

        error => {

            const field =

                element.querySelector(

                    `[name="${error.field}"], #${error.field}`

                );


            if(!field){

                return;

            }


            field.classList.add(

                "input-error"

            );


            const message =

                document.createElement(

                    "div"

                );


            message.className =

                "form-error";


            message.textContent =

                error.message;


            field.parentElement

                .appendChild(

                    message

                );

        }

    );


    return true;

};


/*==========================================================
CREATE TABLE ROW
==========================================================*/

UIManager.createTableRow = function(

    cells = [],

    options = {}

){

    const row =

        document.createElement(

            "tr"

        );


    cells.forEach(

        cell => {

            const td =

                document.createElement(

                    "td"

                );


            if(

                typeof cell ===

                "object" &&

                cell !== null

            ){

                td.textContent =

                    cell.text ??

                    "";

                if(cell.className){

                    td.className =

                        cell.className;

                }

            }else{

                td.textContent =

                    cell ?? "";

            }


            row.appendChild(

                td

            );

        }

    );


    if(options.className){

        row.className =

            options.className;

    }


    return row;

};


/*==========================================================
RENDER TABLE
==========================================================*/

UIManager.renderTable = function({

    selector = "",

    columns = [],

    data = [],

    emptyMessage = "No records found."

} = {}){

    const table =

        this.getElement(selector);


    if(!table){

        return false;

    }


    const thead =

        table.querySelector(

            "thead"

        );


    const tbody =

        table.querySelector(

            "tbody"

        );


    if(!thead || !tbody){

        return false;

    }


    thead.innerHTML = "";

    tbody.innerHTML = "";


    const headerRow =

        document.createElement(

            "tr"

        );


    columns.forEach(

        column => {

            const th =

                document.createElement(

                    "th"

                );


            th.textContent =

                column.label ||

                column.key;


            headerRow.appendChild(

                th

            );

        }

    );


    thead.appendChild(

        headerRow

    );


    if(data.length === 0){

        const row =

            document.createElement(

                "tr"

            );


        const cell =

            document.createElement(

                "td"

            );


        cell.colSpan =

            columns.length || 1;


        cell.textContent =

            emptyMessage;


        row.appendChild(

            cell

        );


        tbody.appendChild(

            row

        );


        return true;

    }


    data.forEach(

        record => {

            const row =

                document.createElement(

                    "tr"

                );


            columns.forEach(

                column => {

                    const cell =

                        document.createElement(

                            "td"

                        );


                    let value =

                        record[column.key];


                    if(

                        typeof column.formatter ===

                        "function"

                    ){

                        value =

                            column.formatter(

                                value,

                                record

                            );

                    }


                    cell.textContent =

                        value ?? "";


                    row.appendChild(

                        cell

                    );

                }

            );


            tbody.appendChild(

                row

            );

        }

    );


    return true;

};


/*==========================================================
FILTER TABLE ROWS
==========================================================*/

UIManager.filterTable = function(

    tableSelector,

    searchTerm

){

    const table =

        this.getElement(

            tableSelector

        );


    if(!table){

        return 0;

    }


    const rows =

        table.querySelectorAll(

            "tbody tr"

        );


    const term =

        String(searchTerm || "")

            .toLowerCase()

            .trim();


    let visibleRows = 0;


    rows.forEach(

        row => {

            const text =

                row.textContent

                    .toLowerCase();


            const visible =

                !term ||

                text.includes(term);


            row.style.display =

                visible

                    ? ""

                    : "none";


            if(visible){

                visibleRows++;

            }

        }

    );


    return visibleRows;

};


/*==========================================================
SORT TABLE
==========================================================*/

UIManager.sortTable = function(

    tableSelector,

    columnIndex,

    ascending = true

){

    const table =

        this.getElement(

            tableSelector

        );


    if(!table){

        return false;

    }


    const tbody =

        table.querySelector(

            "tbody"

        );


    if(!tbody){

        return false;

    }


    const rows =

        Array.from(

            tbody.querySelectorAll(

                "tr"

            )

        );


    rows.sort(

        (a,b) => {

            const first =

                a.cells[columnIndex]

                    ?.textContent

                    .trim() || "";


            const second =

                b.cells[columnIndex]

                    ?.textContent

                    .trim() || "";


            const numberA =

                Number(first);


            const numberB =

                Number(second);


            if(

                !Number.isNaN(numberA) &&

                !Number.isNaN(numberB)

            ){

                return ascending

                    ? numberA - numberB

                    : numberB - numberA;

            }


            return ascending

                ? first.localeCompare(second)

                : second.localeCompare(first);

        }

    );


    rows.forEach(

        row =>

            tbody.appendChild(row)

    );


    return true;

};
/*==========================================================
DASHBOARD & UI RENDERING HELPERS
==========================================================*/

/*==========================================================
FORMAT NUMBER
==========================================================*/

UIManager.formatNumber = function(

    value,

    decimals = 0

){

    const number =

        Number(value) || 0;


    return number.toLocaleString(

        "en-IN",

        {

            minimumFractionDigits:

                decimals,

            maximumFractionDigits:

                decimals

        }

    );

};


/*==========================================================
FORMAT PERCENTAGE
==========================================================*/

UIManager.formatPercentage = function(

    value,

    decimals = 0

){

    const number =

        Number(value) || 0;


    return (

        number.toFixed(decimals) +

        "%"

    );

};


/*==========================================================
UPDATE KPI CARD
==========================================================*/

UIManager.updateKPICard = function({

    selector = "",

    value = 0,

    label = "",

    icon = "",

    trend = null

} = {}){

    const card =

        this.getElement(selector);


    if(!card){

        return false;

    }


    const valueElement =

        card.querySelector(

            "[data-kpi-value]"

        );


    const labelElement =

        card.querySelector(

            "[data-kpi-label]"

        );


    const iconElement =

        card.querySelector(

            "[data-kpi-icon]"

        );


    const trendElement =

        card.querySelector(

            "[data-kpi-trend]"

        );


    if(valueElement){

        valueElement.textContent =

            this.formatNumber(value);

    }


    if(labelElement){

        labelElement.textContent =

            label;

    }


    if(iconElement && icon){

        iconElement.innerHTML =

            icon;

    }


    if(trendElement && trend !== null){

        trendElement.textContent =

            trend;

    }


    return true;

};


/*==========================================================
UPDATE MULTIPLE KPI CARDS
==========================================================*/

UIManager.updateKPICards = function(

    cards = {}

){

    Object.entries(cards).forEach(

        ([selector, data]) => {

            this.updateKPICard({

                selector,

                ...data

            });

        }

    );


    return true;

};


/*==========================================================
RENDER EMPLOYEE CARD
==========================================================*/

UIManager.renderEmployeeCard = function(

    employee

){

    if(!employee){

        return "";

    }


    const efficiency =

        Number(

            employee.efficiency || 0

        );


    const deployed =

        Boolean(

            employee.deployed

        );


    const deploymentStatus =

        deployed

            ? "Deployed"

            : "Ready for Deployment";


    return `

        <div

            class="employee-card"

            data-employee-id="${

                employee.employeeID || ""

            }"

        >

            <div class="employee-card-header">

                <div class="employee-avatar">

                    ${
                        employee.photo

                            ? `

                            <img

                                src="${employee.photo}"

                                alt="${

                                    employee.employeeName || ""

                                }"

                            >

                            `

                            : `

                            <span>

                                ${

                                    (

                                        employee.employeeName ||

                                        "U"

                                    )

                                    .charAt(0)

                                    .toUpperCase()

                                }

                            </span>

                            `

                    }

                </div>


                <div class="employee-basic-info">

                    <h4>

                        ${

                            employee.employeeName ||

                            "Employee"

                        }

                    </h4>

                    <span>

                        ${

                            employee.employeeID ||

                            ""

                        }

                    </span>

                </div>

            </div>


            <div class="employee-card-body">

                <div class="employee-detail">

                    <span>Department</span>

                    <strong>

                        ${

                            employee.department ||

                            "-"

                        }

                    </strong>

                </div>


                <div class="employee-detail">

                    <span>Role</span>

                    <strong>

                        ${

                            employee.role ||

                            "-"

                        }

                    </strong>

                </div>


                <div class="employee-detail">

                    <span>Status</span>

                    <strong>

                        ${deploymentStatus}

                    </strong>

                </div>


                <div class="employee-efficiency">

                    <div class="efficiency-header">

                        <span>Efficiency</span>

                        <strong>

                            ${

                                this.formatPercentage(

                                    efficiency

                                )

                            }

                        </strong>

                    </div>


                    <div class="serentica-progress-track">

                        <div

                            class="serentica-progress-bar"

                            style="width:${

                                Math.min(

                                    100,

                                    Math.max(

                                        0,

                                        efficiency

                                    )

                                )

                            }%"

                        ></div>

                    </div>

                </div>

            </div>


            <div class="employee-card-footer">

                <button

                    type="button"

                    class="btn btn-outline"

                    data-view-employee="${

                        employee.employeeID || ""

                    }"

                >

                    View Details

                </button>

            </div>

        </div>

    `;

};


/*==========================================================
RENDER EMPLOYEE CARDS
==========================================================*/

UIManager.renderEmployeeCards = function(

    selector,

    employees = []

){

    const container =

        this.getElement(selector);


    if(!container){

        return false;

    }


    if(!employees.length){

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-users"></i>

                <h3>No Employees Found</h3>

                <p>

                    There are no employees

                    matching the current criteria.

                </p>

            </div>

        `;

        return true;

    }


    container.innerHTML =

        employees

            .map(

                employee =>

                    this.renderEmployeeCard(

                        employee

                    )

            )

            .join("");


    return true;

};


/*==========================================================
RENDER STATUS BADGE
==========================================================*/

UIManager.renderStatusBadge = function(

    status

){

    const normalized =

        String(status || "")

            .toLowerCase()

            .replace(/\s+/g, "-");


    let type = "neutral";


    if(

        [

            "active",

            "deployed",

            "completed",

            "approved",

            "ready-for-deployment"

        ].includes(normalized)

    ){

        type = "success";

    }


    if(

        [

            "pending",

            "in-progress",

            "under-review"

        ].includes(normalized)

    ){

        type = "warning";

    }


    if(

        [

            "inactive",

            "recalled",

            "cancelled",

            "rejected",

            "blocked"

        ].includes(normalized)

    ){

        type = "danger";

    }


    return `

        <span

            class="status-badge status-${type}"

        >

            ${status || "Unknown"}

        </span>

    `;

};


/*==========================================================
RENDER DEPLOYMENT STATUS
==========================================================*/

UIManager.renderDeploymentStatus = function(

    employee

){

    if(!employee){

        return this.renderStatusBadge(

            "Unknown"

        );

    }


    if(employee.deployed){

        return this.renderStatusBadge(

            "Deployed"

        );

    }


    if(employee.readyForDeployment){

        return this.renderStatusBadge(

            "Ready for Deployment"

        );

    }


    return this.renderStatusBadge(

        "Not Ready"

    );

};


/*==========================================================
UPDATE USER PROFILE
==========================================================*/

UIManager.updateUserProfile = function(){

    if(

        typeof AuthenticationManager ===

        "undefined"

    ){

        return false;

    }


    const profile =

        AuthenticationManager

            .getUserDisplayInformation();


    this.setText(

        "[data-user-name]",

        profile.name

    );


    this.setText(

        "[data-user-id]",

        profile.employeeID

    );


    this.setText(

        "[data-user-role]",

        profile.role

    );


    this.setText(

        "[data-user-department]",

        profile.department

    );


    this.setText(

        "[data-user-site]",

        profile.site

    );


    return true;

};


/*==========================================================
UPDATE DASHBOARD DATE
==========================================================*/

UIManager.updateDashboardDate = function(){

    const element =

        this.getElement(

            "[data-dashboard-date]"

        );


    if(!element){

        return false;

    }


    const date =

        new Date();


    element.textContent =

        date.toLocaleDateString(

            "en-IN",

            {

                weekday:"long",

                day:"numeric",

                month:"long",

                year:"numeric"

            }

        );


    return true;

};


/*==========================================================
RENDER EMPTY STATE
==========================================================*/

UIManager.renderEmptyState = function({

    selector = "",

    icon = "fa-solid fa-inbox",

    title = "No Data Available",

    message = "There is nothing to display."

} = {}){

    const container =

        this.getElement(selector);


    if(!container){

        return false;

    }


    container.innerHTML = `

        <div class="empty-state">

            <i class="${icon}"></i>

            <h3>${title}</h3>

            <p>${message}</p>

        </div>

    `;


    return true;

};


/*==========================================================
UPDATE DASHBOARD SUMMARY
==========================================================*/

UIManager.updateDashboardSummary = function(

    summary = {}

){

    const mappings = {

        totalEmployees:

            "[data-total-employees]",

        readyForDeployment:

            "[data-ready-deployment]",

        deployedEmployees:

            "[data-deployed-employees]",

        openTasks:

            "[data-open-tasks]"

    };


    Object.entries(mappings).forEach(

        ([key, selector]) => {

            if(

                summary[key] !== undefined

            ){

                this.setText(

                    selector,

                    this.formatNumber(

                        summary[key]

                    )

                );

            }

        }

    );


    return true;

};


/*==========================================================
INITIAL DASHBOARD UI
==========================================================*/

UIManager.initializeDashboardUI = function(){

    this.updateUserProfile();

    this.updateDashboardDate();

    return true;

};
/*==========================================================
RESPONSIVE UI & NAVIGATION HELPERS
==========================================================*/

/*==========================================================
GET VIEWPORT INFORMATION
==========================================================*/

UIManager.getViewport = function(){

    const width =

        window.innerWidth;


    if(width < 576){

        return "mobile";

    }


    if(width < 992){

        return "tablet";

    }


    return "desktop";

};


/*==========================================================
CHECK MOBILE VIEW
==========================================================*/

UIManager.isMobile = function(){

    return this.getViewport() === "mobile";

};


/*==========================================================
CHECK TABLET VIEW
==========================================================*/

UIManager.isTablet = function(){

    return this.getViewport() === "tablet";

};


/*==========================================================
CHECK DESKTOP VIEW
==========================================================*/

UIManager.isDesktop = function(){

    return this.getViewport() === "desktop";

};


/*==========================================================
UPDATE RESPONSIVE BODY CLASS
==========================================================*/

UIManager.updateResponsiveClass = function(){

    const body =

        document.body;


    body.classList.remove(

        "viewport-mobile",

        "viewport-tablet",

        "viewport-desktop"

    );


    body.classList.add(

        "viewport-" +

        this.getViewport()

    );

};


/*==========================================================
SIDEBAR TOGGLE
==========================================================*/

UIManager.toggleSidebar = function(){

    const sidebar =

        this.getElement(

            "#sidebar"

        );


    if(!sidebar){

        return false;

    }


    sidebar.classList.toggle(

        "sidebar-open"

    );


    document.body.classList.toggle(

        "sidebar-active"

    );


    return true;

};


/*==========================================================
CLOSE SIDEBAR
==========================================================*/

UIManager.closeSidebar = function(){

    const sidebar =

        this.getElement(

            "#sidebar"

        );


    if(sidebar){

        sidebar.classList.remove(

            "sidebar-open"

        );

    }


    document.body.classList.remove(

        "sidebar-active"

    );


    return true;

};


/*==========================================================
SET ACTIVE NAVIGATION
==========================================================*/

UIManager.setActiveNavigation = function(

    page

){

    const navigationItems =

        this.getElements(

            "[data-nav-page]"

        );


    navigationItems.forEach(

        item => {

            item.classList.remove(

                "active"

            );


            const itemPage =

                item.getAttribute(

                    "data-nav-page"

                );


            if(

                itemPage &&

                itemPage

                    .toLowerCase() ===

                page.toLowerCase()

            ){

                item.classList.add(

                    "active"

                );

            }

        }

    );

};


/*==========================================================
INITIALIZE NAVIGATION
==========================================================*/

UIManager.initializeNavigation = function(){

    const currentPage =

        this.getCurrentPage();


    this.setActiveNavigation(

        currentPage

    );


    const navigationLinks =

        this.getElements(

            "[data-nav-page]"

        );


    navigationLinks.forEach(

        link => {

            link.addEventListener(

                "click",

                event => {

                    const targetPage =

                        link.getAttribute(

                            "data-nav-page"

                        );


                    if(!targetPage){

                        return;

                    }


                    event.preventDefault();


                    window.location.href =

                        targetPage;

                }

            );

        }

    );


    return true;

};


/*==========================================================
LOGOUT BUTTON INITIALIZATION
==========================================================*/

UIManager.initializeLogoutButtons = function(){

    const buttons =

        this.getElements(

            "[data-action='logout']"

        );


    buttons.forEach(

        button => {

            button.addEventListener(

                "click",

                () => {

                    this.confirmAction(

                        "Are you sure you want to logout?",

                        () => {

                            if(

                                typeof AuthenticationManager !==

                                "undefined"

                            ){

                                AuthenticationManager.logout();

                            }

                        }

                    );

                }

            );

        }

    );


    return true;

};


/*==========================================================
SIDEBAR MENU BUTTON
==========================================================*/

UIManager.initializeSidebarButton = function(){

    const button =

        this.getElement(

            "[data-action='toggle-sidebar']"

        );


    if(!button){

        return false;

    }


    button.addEventListener(

        "click",

        () => {

            this.toggleSidebar();

        }

    );


    return true;

};


/*==========================================================
CLOSE SIDEBAR ON OUTSIDE CLICK
==========================================================*/

UIManager.initializeSidebarOutsideClick = function(){

    document.addEventListener(

        "click",

        event => {

            const sidebar =

                this.getElement(

                    "#sidebar"

                );


            const toggleButton =

                this.getElement(

                    "[data-action='toggle-sidebar']"

                );


            if(

                !sidebar ||

                !this.isMobile()

            ){

                return;

            }


            if(

                sidebar.contains(event.target) ||

                (

                    toggleButton &&

                    toggleButton.contains(

                        event.target

                    )

                )

            ){

                return;

            }


            this.closeSidebar();

        }

    );

};


/*==========================================================
WINDOW RESIZE HANDLER
==========================================================*/

UIManager.initializeResponsiveEvents = function(){

    this.updateResponsiveClass();


    let resizeTimer;


    window.addEventListener(

        "resize",

        () => {

            clearTimeout(

                resizeTimer

            );


            resizeTimer =

                setTimeout(

                    () => {

                        this.updateResponsiveClass();

                    },

                    150

                );

        }

    );


    return true;

};


/*==========================================================
SCROLL TO ELEMENT
==========================================================*/

UIManager.scrollTo = function(

    selector,

    behavior = "smooth"

){

    const element =

        this.getElement(

            selector

        );


    if(!element){

        return false;

    }


    element.scrollIntoView({

        behavior:behavior,

        block:"start"

    });


    return true;

};


/*==========================================================
INITIALIZE RESPONSIVE UI
==========================================================*/

UIManager.initializeResponsiveUI = function(){

    this.initializeResponsiveEvents();

    this.initializeSidebarButton();

    this.initializeSidebarOutsideClick();

    return true;

};
/*==========================================================
FINAL INITIALIZATION & INTEGRATION
==========================================================*/

/*==========================================================
INITIALIZE UI MANAGER
==========================================================*/

UIManager.initializeApplicationUI = function(){

    if(this.initialized){

        return true;

    }


    console.log(

        "Initializing Serentica UI Manager..."

    );


    this.currentPage =

        this.getCurrentPage();


    this.loadNotifications();


    this.initializeResponsiveUI();


    this.initializeNavigation();


    this.initializeLogoutButtons();


    this.initializeDashboardUI();


    this.initialized = true;


    console.log(

        "Serentica UI Manager initialized successfully."

    );


    return true;

};


/*==========================================================
PAGE-SPECIFIC INITIALIZATION
==========================================================*/

UIManager.initializeCurrentPage = function(){

    const page =

        this.currentPage ||

        this.getCurrentPage();


    switch(page){

        case "index.html":

            this.initializeLoginPage();

            break;


        case "welcome.html":

            this.initializeWelcomePage();

            break;


        case "employee.html":

            this.initializeEmployeePage();

            break;


        case "deployment.html":

            this.initializeDeploymentPage();

            break;


        case "recall.html":

            this.initializeRecallPage();

            break;


        case "organisation.html":

            this.initializeOrganisationPage();

            break;


        case "reports.html":

            this.initializeReportsPage();

            break;


        case "admin.html":

            this.initializeAdminPage();

            break;


        default:

            break;

    }

};


/*==========================================================
LOGIN PAGE
==========================================================*/

UIManager.initializeLoginPage = function(){

    const loginForm =

        this.getElement(

            "#loginForm"

        );


    if(!loginForm){

        return false;

    }


    loginForm.addEventListener(

        "submit",

        async event => {

            event.preventDefault();


            const validation =

                this.validateForm(

                    loginForm

                );


            if(!validation.valid){

                this.displayFormErrors(

                    loginForm,

                    validation.errors

                );

                this.error(

                    "Please complete all required fields."

                );

                return;

            }


            const data =

                this.getFormData(

                    loginForm

                );


            const employeeID =

                data.employeeID ||

                data.employeeId ||

                data.username;


            const password =

                data.password;


            const rememberMe =

                Boolean(

                    loginForm.querySelector(

                        "[name='rememberMe']"

                    )?.checked

                );


            if(

                typeof AuthenticationManager ===

                "undefined"

            ){

                this.error(

                    "Authentication service is unavailable."

                );

                return;

            }


            this.setButtonLoading(

                loginForm.querySelector(

                    "button[type='submit']"

                ),

                true,

                "Signing in..."

            );


            try{

                const result =

                    AuthenticationManager.loginSecure(

                        employeeID,

                        password,

                        rememberMe

                    );


                if(result.success){

                    this.success(

                        "Login successful."

                    );


                    setTimeout(

                        () => {

                            AuthenticationManager

                                .redirectAfterLogin();

                        },

                        500

                    );

                }else{

                    this.error(

                        result.message ||

                        "Login failed."

                    );

                }

            }catch(error){

                console.error(

                    "Login error:",

                    error

                );


                this.error(

                    "Unable to complete login."

                );

            }finally{

                this.setButtonLoading(

                    loginForm.querySelector(

                        "button[type='submit']"

                    ),

                    false

                );

            }

        }

    );


    return true;

};


/*==========================================================
WELCOME PAGE
==========================================================*/

UIManager.initializeWelcomePage = function(){

    this.updateUserProfile();

    this.updateDashboardDate();


    if(

        typeof AuthenticationManager !==

        "undefined"

    ){

        const access =

            AuthenticationManager

                .getAccessProfile();


        const navigation =

            AuthenticationManager

                .getNavigationItems();


        this.renderNavigationItems(

            navigation

        );


        return access;

    }


    return false;

};


/*==========================================================
EMPLOYEE PAGE
==========================================================*/

UIManager.initializeEmployeePage = function(){

    this.updateUserProfile();

    this.updateDashboardDate();


    if(

        typeof EmployeeManager ===

        "undefined"

    ){

        return false;

    }


    return true;

};


/*==========================================================
DEPLOYMENT PAGE
==========================================================*/

UIManager.initializeDeploymentPage = function(){

    this.updateUserProfile();


    if(

        typeof DeploymentManager ===

        "undefined"

    ){

        return false;

    }


    return true;

};


/*==========================================================
RECALL PAGE
==========================================================*/

UIManager.initializeRecallPage = function(){

    this.updateUserProfile();


    return true;

};


/*==========================================================
ORGANISATION PAGE
==========================================================*/

UIManager.initializeOrganisationPage = function(){

    this.updateUserProfile();


    return true;

};


/*==========================================================
REPORTS PAGE
==========================================================*/

UIManager.initializeReportsPage = function(){

    this.updateUserProfile();


    return true;

};


/*==========================================================
ADMIN PAGE
==========================================================*/

UIManager.initializeAdminPage = function(){

    this.updateUserProfile();


    return true;

};


/*==========================================================
RENDER NAVIGATION ITEMS
==========================================================*/

UIManager.renderNavigationItems = function(

    items = []

){

    const containers =

        this.getElements(

            "[data-navigation-container]"

        );


    if(!containers.length){

        return false;

    }


    const html =

        items.map(

            item => `

                <a

                    href="${item.page}"

                    class="navigation-item"

                    data-nav-page="${item.page}"

                >

                    <span class="navigation-icon">

                        ${item.icon || ""}

                    </span>


                    <span class="navigation-label">

                        ${item.label}

                    </span>

                </a>

            `

        ).join("");


    containers.forEach(

        container => {

            container.innerHTML =

                html;

        }

    );


    this.setActiveNavigation(

        this.currentPage

    );


    return true;

};


/*==========================================================
GLOBAL UI HEALTH CHECK
==========================================================*/

UIManager.healthCheck = function(){

    return{

        module:

            "UI Manager",

        initialized:

            this.initialized,

        currentPage:

            this.currentPage,

        viewport:

            this.getViewport(),

        notifications:

            this.notifications.length,

        activeModals:

            this.modals.length,

        activeToasts:

            this.toasts.length

    };

};


/*==========================================================
GLOBAL UI INSTANCE
==========================================================*/

window.UIManager = UIManager;


/*==========================================================
START UI MANAGER
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        UIManager.initializeApplicationUI();

        UIManager.initializeCurrentPage();

    }

);


/*==========================================================
FINAL STATUS
==========================================================*/

console.log(

    "========================================"

);

console.log(

    "Serentica Site Manpower Management System"

);

console.log(

    "UI Manager"

);

console.log(

    "Status : READY"

);

console.log(

    "========================================"

);
