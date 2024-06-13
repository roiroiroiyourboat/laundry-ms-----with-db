//BURGER MENU
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = navLinks.querySelectorAll('a'); // Select all the links inside navLinks

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Add event listeners to each nav link to close the navigation container when clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const btnLogin = document.getElementById('form_open');
    const btnLaundryService = document.getElementById('openService');
    const login_form = document.getElementById('form_container');
    const laundry_service_form = document.getElementById('service_form');

    //open the login form
    btnLogin.onclick = function() {
        login_form.style.display = 'block';
        laundry_service_form.style.display = 'none';
    }

    //open the service request
    btnLaundryService.addEventListener('click', () => {
            laundry_service_form.style.display = 'block';
            login_form.style.display = 'none';
    });

});

//scrolling effect
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    const scaleValue = 0.5 + (scroll * 0.5); // Scale from 0.5 to 1 based on scroll position
    document.body.style.setProperty('--scale', scaleValue);
}, false);

/*window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);*/

//POP-UP LOGIN FORM
document.addEventListener('DOMContentLoaded', (event) => {
    const login_form = document.getElementById("form_container");
    const openLogin = document.getElementById("form_open");
    const closeBtn = document.getElementsByClassName("btnClose")[0];

    //open the service form
    openLogin.onclick = function() {
        login_form.style.display = "block";
    }

    //close the service form
    closeBtn.onclick = function() {
        login_form.style.display = "none";
    }

});

document.addEventListener('DOMContentLoaded', (event) => {
    const service_form = document.getElementById("service_form");
    const login_form = document.getElementById("form_container");
    const openLogin = document.getElementById("form_open");
    const openService = document.getElementById("openService");

    //open the login form
    openLogin.onclick = function() {
        login_form.style.display = "block";
        service_form.style.display = 'none';
    }

    //open the service form
    openService.onclick = function() {
        service_form.style.display = "block";
        login_form.style.display = 'none';
    }

});

//pop up for laundry service form
document.addEventListener('DOMContentLoaded', (event) => {
    const service_form = document.getElementById("service_form");
    const openBtn = document.getElementById("openService");
    const closeBtn = document.getElementsByClassName("btnClose")[1];

    //open the service form
    openBtn.onclick = function() {
        service_form.style.display = "block";
    }

    //close the service form
    closeBtn.onclick = function() {
        service_form.style.display = "none";
    }

});

//SERVICE REQUEST
//event listener for button cancel in first modal of the service request
document.getElementById('btnCancel').addEventListener('click', function(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Are sure you want to cancel your service request?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const service_form = document.getElementById('form_id');
            const service_form_con = document.getElementById('service_form');

            service_form.reset();
            service_form_con.style.display = 'none';  
        }
    });
});

//OVERVIEW PANEL
document.addEventListener('DOMContentLoaded', (event) => {
    const service_overview = document.getElementById("service_overview");
    const service_form = document.getElementById('service_form');
    const closeBtn = document.getElementsByClassName("btnClose")[2];
    const btnBack = document.getElementById('btnBack');

    //close the service overview
    closeBtn.onclick = function() {
        service_overview.style.display = "none";
    }

    //back in the first modal
    btnBack.onclick = function() {
        service_overview.style.display = "none";
        service_form.style.display = "block";
    }

});

document.getElementById('btnProceed').addEventListener('click', function(event) {
    event.preventDefault();

    const service_overview = document.getElementById('service_overview');
    const service_details = document.getElementById('service_details');

    service_overview.style.display = 'none';
    service_details.style.display = 'block';
});

//LAUNNDRY SERVICE DETAILS
document.addEventListener('DOMContentLoaded', (event) => {
    const service_details = document.getElementById('service_details');
    const closeBtn = document.getElementsByClassName("btnClose")[3];

    //close the service overview
    closeBtn.onclick = function() {
        service_details.style.display = "none";
    }

});

document.getElementById('btnCancel_service_details').addEventListener('click', function(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Are sure you want to cancel your service request?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            //service details
            const clearElements = document.querySelectorAll('.form-service');
            clearElements.forEach(element => {
                element.value = element.defaultValue;
            });
            document.getElementById('service_details').style.display = 'none'; 
           
        }
    });
});


//PRINT INVOICE

/***************************LAUNDRY SERVICE REQUEST****************************/
$(document).ready(function() {
    $('#form_id').submit(function(event) {
        event.preventDefault(); //Prevent default form submission
        
        //AJAX request to save order to the database
        $.ajax({
            type: 'POST',
            url: 'laundryService_config.php',
            data: $(this).serialize(),
            success: function(response) {
                // Show SweetAlert upon successful insertion
                swal.fire("Order added successfully!", "Your laundry service request has been added to the list.", "success")
                .then((result) => {
                    if (result.isConfirmed) {
                        
                        var customerName = $('#customer_name').val();
                        $('#customer_name_display').text(customerName);

                        var contactNumber = $('#contact_number').val();
                        $('#contact_number_display').text(contactNumber);

                        //Append order details to service overview section
                        var orderDetails = '<tr>' +
                        '<td>' + $('select[name="quantity"]').val() + '</td>' +
                        '<td>' + $('select[name="service"]').val() + '</td>' +
                        '<td>' + $('select[name="category"]').val() + '</td>' +
                        '<td>' + $('#weight').val() + '</td>' +
                        '<td>' + $('#category_rate').val() + '</td>' +
                        '<td>' + $('#price').val() + '</td>' +
                        '</tr>';
                    $('#service_overview tbody').append(orderDetails);
                        
                        //clear form
                        $('#form_id')[0].reset();
                    }
                });
            },
            error: function(xhr, status, error) {
                // Log the error details to the console
                console.error("Status: " + status);
                console.error("Error: " + error);
                console.error("Response: " + xhr.responseText);

                // Display a SweetAlert with error details
                swal.fire("Order submission failed!", "An error occurred while submitting your order. Please try again.", "error");
            }
        });
    });

    // Handle "Done" button click
    $('#doneButton').click(function() {
        // Hide service form and show service overview section
        $('#service_form').hide();
        $('#service_overview').show();
    });

    $('#btnCancel_service').click(function() {
        swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel your service request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var customerName = $('#customer_name_display').text();
                var contactNumber = $('#contact_number_display').text();

                $.ajax({
                    type: 'POST',
                    url: 'delete_order.php',
                    data: { customer_name: customerName, contact_number: contactNumber },
                    dataType: 'json',
                    success: function(response) {
                        if (response.status === 'success') {
                            swal.fire("Order canceled successfully!", response.message, "success")
                            .then((result) => {
                                if (result.isConfirmed) {
                                    // Clear the service overview table and hide the section
                                    $('#service_overview tbody').empty();
                                    $('#customer_name_display').empty();
                                    $('#contact_number_display').empty();
                                    //$('#service_overview').hide();
                                }
                            });
                        } else {
                            swal.fire("Order cancellation failed!", response.message, "error");
                        }
                    },
                    error: function(xhr, status, error) {
                        // Log the error details to the console
                        console.error("Status: " + status);
                        console.error("Error: " + error);
                        console.error("Response: " + xhr.responseText);

                        // Display a SweetAlert with error details
                        swal.fire("Order cancellation failed!", "An error occurred while canceling your order. Please try again.", "error");
                    }
                });
            }
        });
    });

});
