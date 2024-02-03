<template>
    <div class="container">
        <div v-for="(item, index) in user" :key="index">
            <div class="card text-center">
                <div class="card-header">
                    {{ item.id }}
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" v-model="data.email"
                            @change="event => text = event.target.value">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Fullname</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" v-model="data.fullname"
                            @change="event => text = event.target.value">
                    </div>
                </div>
                <div class="card-footer text-body-secondary">
                    <a href="#" class="btn btn-primary" @click="handleRedirect">Home Page</a>
                    <a href="#" class="btn btn-info" @click="handleUpdateItem">Update</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});
export default {
    data() {
        return {
            user: null,
            data: {
                email: '',
                fullname: ''
            }
        }
    },
    created: function () {
        axiosInstance.get('/currentUser/' + this.$route.params.id).then((response) => {
            this.user = response.data;
            this.data.email = response.data[0].email;
            this.data.fullname = response.data[0].fullname;
        }).catch((err) => {
            console.log(err);
        });
    },
    methods: {
        handleRedirect() {
            this.$router.push("/");
        },
        handleUpdateItem() {
            axiosInstance.put('/usersUpdate/' + this.$route.params.id, this.data).then((response) => {
                console.log(response.data.updatedUser);
            }).catch((err) => {
                console.log(err);
            });
        },
    }
}
</script>

<style></style>