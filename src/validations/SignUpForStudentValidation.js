<script>
    $('.ui.form')
    .form({

        email: {
        identifier: 'email',
    rules: [
                {
        type: 'email',
    prompt: 'Please enter a valid email addres'
}
]
},
        password: {
        identifier: 'password',
    rules: [
                {
        type: 'empty',
    prompt: 'Please enter a password'
},
                {
        type: 'length[8]',
    prompt: 'Your password must be at least 8 characters'
}
]
},
        passwordConfirm: {
        identifier: 'confirm-password',
    rules: [
                {
        type: 'empty',
    prompt: 'Please confirm your password'
},
                {
        type: 'match[password]',
    prompt: 'Password doesn\'t match'
}
]
},

});
    </script>