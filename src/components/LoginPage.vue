<template>
<div>
    <div class="container">
        <h2 class="title">LOGIN</h2>
        <form @submit.prevent="login">
            <div class="form-field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your email.." v-model="email" required>
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Your password.." v-model="password" required>
            </div>
            <div class="form-field-btn">
                <input class="btn" type="submit" value="Submit">
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login() {
            if (this.email == 'admin@gmail.com' && this.password == 'admin') {
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('isUser', 'true');
                alert('Admin are logged in successfully');
                this.$router.push('/');
            } else if (this.email !== 'admin@gmail.com' || this.password !== 'admin') {
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('isUser', 'true');
                alert('User are logged in successfully');
                this.$router.push('/')
            }
        }
    }
}
</script>