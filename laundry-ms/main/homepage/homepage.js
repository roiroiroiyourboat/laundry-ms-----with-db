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

/***************************LAUNDRY SERVICE REQUEST****************************/
//fetching laundry service
function fetchServices() {
    fetch('/laundry-ms/main/homepage/home_configs/fetch_laundry_service.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging
            let dropdown = document.getElementById('service');
            dropdown.innerHTML = '<option selected>--Select Service--</option>'; // Clear existing options
            data.forEach(services => {
                let option = document.createElement('option');
                option.value = services;
                option.textContent = services;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching services:', error));
}
document.addEventListener('DOMContentLoaded', fetchServices);

//fetching laundry category
function fetchCategories() {
    fetch('/laundry-ms/main/homepage/home_configs/fetchLaundryCateg.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging
            let dropdown = document.getElementById('category');
            dropdown.innerHTML = '<option selected>--Select Category--</option>'; //clear existing options
            data.forEach(category => {
                let option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}
//fetch categories when the page loads
document.addEventListener('DOMContentLoaded', fetchCategories);

//collects user input and submit data through database
$(document).ready(function() {
    $('#form_id').submit(function(event) {
        event.preventDefault();
    
        var customerName = $('#customer_name').val();
        var contactNumber = $('#contact_number').val();
    
        //Validate if the customer name or conact number already exists
        $.ajax({
            type: 'POST',
            url: '/laundry-ms/main/homepage/home_configs/validate_customer.php',
            data: { 
                customer_name: customerName, 
                contact_number: contactNumber 
            },
            success: function(response) {
                if (response.status === 'error') {
                    swal.fire("Validation Failed!", response.message, "error");
                } else {
                    // if customer name and contact number is available, proceed with form submission
                    $.ajax({
                        type: 'POST',
                        url: 'laundryService_config.php',
                        data: $('#form_id').serialize(),
                        success: function(response) {
                            if (response.status === 'success') {
                                swal.fire("Order added successfully!", response.message, "success")
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        $('#customer_id_display').text(response.customer_id);
                                        $('#customer_name_display').text(customerName);
                                        $('#contact_number_display').text(contactNumber);
    
                                        var orderDetails = '<tr>' +
                                            '<td>' + $('select[name="quantity"]').val() + '</td>' +
                                            '<td>' + $('select[name="service"]').val() + '</td>' +
                                            '<td>' + $('select[name="category"]').val() + '</td>' +
                                            '<td>' + $('#weight').val() + '</td>' +
                                            '<td>' + $('#price').val() + '</td>' +
                                            '</tr>';
                                        $('#service_overview tbody').append(orderDetails);
    
                                        // Clear form
                                        $('#form_id')[0].reset();
                                    }
                                });
                            } else {
                                swal.fire("Order submission failed!", response.message, "error");
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("Status: " + status);
                            console.error("Error: " + error);
                            console.error("Response: " + xhr.responseText);
    
                            swal.fire("Order submission failed!", "An error occurred while submitting your order. Please try again.", "error");
                        }
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Status: " + status);
                console.error("Error: " + error);
                console.error("Response: " + xhr.responseText);
    
                swal.fire("Validation failed!", "An error occurred while validating the customer name. Please try again.", "error");
            }
        });
    });
    


    //"Done" button click
    $('#doneButton').click(function() {
        //hide service form and show service overview section
        $('#service_form').hide();
        $('#service_overview').show();
    });

    $('#btnCancel_service').click(function() {
        swal.fire({
            title: 'Cancel Service Request?',
            text: 'Are you sure do you want to cancel your service request?',
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
                                    //clear the service overview table and hide the section
                                    $('#customer_id_display').text('');
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

     // Calculate rate function
    function calculateRate(weight) {
        const ratePerKilo = 5; // Example rate per kilo
        return (weight * ratePerKilo).toFixed(2);
    }

});
