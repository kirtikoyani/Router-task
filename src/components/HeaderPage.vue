<template>
<nav>
    <div class="routes">
        <router-link v-if="showHomeLink" to="/">Home</router-link>
        <router-link v-if="showAdminLink" to="/admin">Admin</router-link>
        <router-link v-if="showUserLink" to="/users">Users</router-link>
        <router-link v-if="showHomeLink" to="/settings">Setting</router-link>
    </div>

    <button class="btn-a" v-if="showHomeLink" @click="logout()">logout</button>
</nav>
</template>


<script>
export default {
    watch: {
        $route() {
            //console.log(to,from)
            this.updateNavbar();
        }
    },
    data() {
        return {
            showHomeLink: false,
            showUserLink: false,
            showAdminLink: false,
        };
    },
    methods: {
        updateNavbar() {
            const requiresAuth = JSON.parse(localStorage.getItem('isUser'));
            const requiresAdmin = JSON.parse(localStorage.getItem('isAdmin'));

            this.showAdminLink = requiresAdmin;
            this.showUserLink = requiresAuth;
            this.showHomeLink = requiresAuth || requiresAdmin;
        },
        logout() {
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('isUser');
            this.$router.push('/login');
        },
    },

    created() {
        this.updateNavbar();
    }
};
</script>