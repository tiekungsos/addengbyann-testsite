const scriptURL = 'https://script.google.com/macros/s/AKfycbye3Zb3TjYdNwd6FtIb4IqDBh8aW1D0V5LQ1VPZ2lfCFGDjAFRo/exec'
const form = document.forms['submit-to-google-sheet']
const loading = document.querySelector('.js-loading')
const successMessage = document.querySelector('.js-success-message')
const errorMessage = document.querySelector('.js-error-message')
const alert = document.querySelector('.alert-success')



form.addEventListener('submit', e => {
    e.preventDefault()

    showLoadingIndicator()
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => showSuccessMessage(response))
        .catch(error => showErrorMessage(error))

    setTimeout(() => {

        alert.classList.remove('is-hidden')
        successMessage.classList.remove('is-hidden')
        loading.classList.add('is-hidden')

        var data = '<br><div><ol><li>ชื่อ : ' + fromData[0]['value'] + '</li><li>ชื่อเล่น : ' + fromData[1]['value'] + '</li><li>อายุ : ' + fromData[2]['value'] + '</li><li>วิชา : ' + fromData[3]['value'] + '</li><li>Course : ' + fromData[4]['value'] + '</li><li>ชนิด : ' + fromData[5]['value'] + '</li><li>โทร : ' + fromData[6]['value'] + '</li><li>ไลน์ : ' + fromData[7]['value'] + '</li><li>เริ่มเรียน : ' + fromData[8]['value'] + '</li><li>ความต้องการ : ' + fromData[9]['value'] + '</li><li>ข้อความ : ' + fromData[10]['value'] + '</li></ol></div> '
        Email.send({
            SecureToken: "0bbcd63a-575e-4a56-92a4-82514984e366",
            To: 'tutorann.spvd@gmail.com',
            // To: 'beeze001@gmail.com',
            From: "supavadee@engbyann.com",
            Subject: "มีนักเรียนกรอกข้อมูลเข้ามาในระบบ",
            Body: "ไปตรวจสอบข้อมูลได้ที่ https://docs.google.com/spreadsheets/d/1IX_oOVWrLoNdK7eiQoczke3VbBIY4IJot45hA1j7Q90/edit?usp=sharing" + data
        }).then(
            message => console.log(message)
        ).catch();

    }, 500)


})



function showLoadingIndicator() {
    form.classList.add('is-hidden')
    loading.classList.remove('is-hidden')
}

function showSuccessMessage(response) {
    console.log('Success!', response)
    setTimeout(() => {
        successMessage.classList.remove('is-hidden')
        loading.classList.add('is-hidden')
    }, 500)
}

function showErrorMessage(error) {
    console.error('Error!', error.message)
    setTimeout(() => {
        errorMessage.classList.remove('is-hidden')
        loading.classList.add('is-hidden')
    }, 500)
}