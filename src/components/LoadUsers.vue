<template>
    <el-container>
        <el-header><h1>🚀Vue FireBase Crud App🚀</h1></el-header>
        <el-main>
            <el-card class="box-card">
                <center><h2 style="margin-bottom:20px;" v-text="enableEditMode?'Edit Details':'Add New Details'" /></center>
                <el-form ref="form" label-width="120px">
                    <el-form-item label="Enter Name">
                        <el-input style="width:600px" v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="Enter Email">
                        <el-input style="width:600px" v-model="email"></el-input>
                    </el-form-item>
                    <el-button style="float: right;margin:10px 0px;" @click="getDetails" type="success">Save</el-button>
                </el-form>
            </el-card>
            <el-table v-if="!enableEditMode" style="margin-top:50px;width:100%" height="250" :data="users">
                <el-table-column
                    prop="name"
                    label="Name">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="Email">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="Edit"
                    width="100">
                    <template #default="scope">
                        <el-button
                        type="primary"
                        size="small"
                        @click.prevent="OnEditData(scope.row)"
                        >
                        Edit
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="Remove"
                    width="100">
                    <template #default="scope">
                        <el-button
                        type="danger"
                        size="small"
                        @click.prevent="OnDeleteData(scope.row)"
                        >
                        Remove
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
import {ref} from 'vue'
import { useLoadUser,createUser,updateUser,deleteUser } from '../../firebase'


export default {
    setup () {
        const enableEditMode=ref(false)
        const Id=ref(null)
        const name=ref('')
        const email=ref('')
        const users=useLoadUser()

        const OnEditData=(row)=>{
            Id.value=row.id
            name.value=row.name
            email.value=row.email
            enableEditMode.value=true
        }
        const OnDeleteData=(row)=>{
            deleteUser(row.id)
        }
        const getDetails=()=>{
            if(!enableEditMode.value){
                createUser({name:name.value,email:email.value})
            }
            else{
                updateUser(Id.value,{name:name.value,email:email.value})
                enableEditMode.value=false
            }
            name.value=''
            email.value=''
        }
        return {
            users,
            name,
            enableEditMode,
            email,
            getDetails,
            OnEditData,
            OnDeleteData
        }
    }
}
</script>

<style>
*{
    margin:0;
    padding: 0;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>