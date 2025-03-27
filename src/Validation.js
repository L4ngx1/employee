/* global $ */

export const setupEmployeeFormValidation = () => {
    // Custom validation method
    $.validator.addMethod("phoneFormat", function (value, element) {
        return this.optional(element) || /^[\d\s+\-()]+$/.test(value);
    }, "Please enter a valid phone number");

    $.validator.addMethod("strictEmail", function (value, element) {
        return this.optional(element) ||
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    }, "Please enter a valid email address (e.g., user@example.com)");

    $("#employeeForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            email: {
                required: true,
                strictEmail: true,  // Sử dụng custom validator
                maxlength: 100
            },
            address: {
                required: true,
                minlength: 5,
                maxlength: 200
            },
            phone: {
                required: true,
                phoneFormat: true,
                minlength: 10,
                maxlength: 15
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Name must be at least 3 characters",
                maxlength: "Name cannot exceed 50 characters"
            },
            email: {
                required: "Please enter your email address",
                strictEmail: "Please enter a complete email address (e.g., user@example.com)",
                maxlength: "Email cannot exceed 100 characters"
            },
            address: {
                required: "Please enter your address",
                minlength: "Address must be at least 5 characters",
                maxlength: "Address cannot exceed 200 characters"
            },
            phone: {
                required: "Please enter your phone number",
                minlength: "Phone number must be at least 10 digits",
                maxlength: "Phone number cannot exceed 15 digits"
            }
        },
        errorElement: "span",
        errorClass: "error-message",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            element.after(error);
        }
    });
};

export const destroyEmployeeFormValidation = () => {
    if ($("#employeeForm").length) {
        $("#employeeForm").validate().destroy();
    }
};