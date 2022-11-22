let accountusers = [{
    email: "phuocvip1497@gmail.com",
    name: "Hoàng Ngọc Đại Phước",
    password: "123456",
    sdt: "0984253741"
}, {
    email: "daiphuoc1497@gmail.com",
    name: "Hoàng C Đại Phước",
    password: "123456",
    sdt: "0984253741"
}];
let admins = [{
        email: "admin1",
        password: "1111",
    },
    {
        email: "admin2",
        password: "2222",
    },
    {
        email: "admin3",
        password: "3333",
    }
]

function afterRegister() {
    alert("Đăng ký Thành Công Mời bạn bắt đầu đăng nhập");
}


function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid)
                formElement.submit();
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function(rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

function checkUsers() {
    var email = document.getElementById('email1').value;
    var password = document.getElementById('password1').value;

    console.log(email === accountusers[0].email);
    console.log(password === accountusers[1].password);
    for (let i = 0; i < accountusers.length; i++) {
        if (email === accountusers[i].email) {
            if (password === accountusers[i].password) {

                localStorage.setItem('issignin', 1);
                localStorage.setItem('email', accountusers[i].email);
                localStorage.setItem('password', accountusers[i].password);
                break;
            } else {
                alert("sai mât khẩu")
            };
        }
    }
}

function checkSignIn() {
    var signin = localStorage.getItem('issignin');
    let headeruser = document.querySelector(".icon-user");
    let email = localStorage.getItem('email');
    console.log(signin);
    if (signin == 1) {
        headeruser.innerHTML = ' ';
        console.log(headeruser);
        headeruser.innerHTML += `
        <li class="nav-item dropdown">
                <a class="fas fa-user nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"></a>
                <ul class="dropdown-menu">
                    <a href="/Facility/dangky/Dangky.html" class="dropdown-item">
                        <li>Email:${email}</li>
                    </a>
                    <a onclick="logout()" class="dropdown-item ">
                        <li>logout</li>
                    </a>
                </ul>
            </li>
`;

    }
}

function logout() {
    var signin = localStorage.getItem('issignin');
    let headeruser = document.querySelector(".icon-user");
    console.log(headeruser);
    if (signin) {
        localStorage.setItem('issignin', 0);
    }
}
checkSignIn();

function showUserInfor() {
    let signin = localStorage.getItem('issignin');
    let email = localStorage.getItem('email');
    let headeruser = document.querySelector(".user-infor");
    if (signin) {
        for (let i = 0; i < accountusers.length; i++)
            if (email === accountusers[i].email) {
                headeruser.innerHTML = ' ';

                headeruser.innerHTML += `
        <div class=" ">
            <label for="kh_ten ">Họ tên</label>
            <input type="text " class="form-control " name="kh_ten " id="kh_ten " value="${accountusers[i].name} " readonly=" ">
        </div>
        <div class=" ">
                                <label for="kh_email ">Email</label>
                                <input type="text " class="form-control " name="kh_email " id="kh_email " value="${accountusers[i].email} " readonly=" ">
                            </div>
`;
            }
    }
}

showUserInfor();