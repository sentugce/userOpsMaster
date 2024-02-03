<template>
    <nav>
        <div>
            <div class="container">
                <div v-if="open == false">
                    <button @click="open = true" class="btn btn-success">Add New User</button>
                </div>
                <div v-else>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" v-model="data.email"
                            @change="event => text = event.target.value">
                        <label for="exampleFormControlInput1" class="form-label">Fullname</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="data.fullname"
                            @change="event => text = event.target.value">
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" v-model="data.password"
                            @change="event => text = event.target.value">
                        <button @click="handleAddUser" class="btn btn-success">Save</button>
                        <button @click="open = false" class="btn btn-primary">Close</button>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id</th>
                            <th scope="col">email</th>
                            <th scope="col">fullname</th>
                            <th scope="col">update</th>
                            <th scope="col">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <th scope="row"></th>
                            <td>{{ user.id }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.fullname }}</td>
                            <td><button class="btn btn-success" @click="() => update(user.id)">update</button></td>
                            <td><button class="btn btn-danger" @click="() => deleteUser(user.id)">delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});
export default {
    data() {
        return {
            users: [],
            open: false,
            data: {
                email: '',
                password: '',
                fullname: ''
            }
        };
    },
    created: function () {
        this.getList();
    },
    methods: {
        getList() {
            axiosInstance.get('/usersList').then((response) => {
                this.users = response.data;
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });
        },
        update(id) {
            //console.log(id);
            this.$router.push("/user-detail/" + id);
        },
        deleteUser(id) {
            axiosInstance.delete('/usersDelete/' + id).then((response) => {
                console.log(response.data.deletedUser);
            }).catch((err) => {
                console.log(err);
            });
        },
        handleAddUser() {
            axiosInstance.post('/usersSave', this.data).then((response) => {
                this.open = false;
                this.users.push(response.data.createUser);
                console.log(response.data.createUser);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
}
</script>
<style scoped lang="scss">
.container {
    padding: 30px;
    display: flex;
    flex-direction: column-reverse;
}
</style>
