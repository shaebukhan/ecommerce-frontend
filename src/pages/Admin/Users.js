import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
const Users = () => {
    return (
        <Layout title="All Users Sasta-Store">
            <div className="container-fluid  p-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users; 
