import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout/Layout";
import AuthLayout from "./components/layout/layout/AuthLayout";

// login
import Login, { action as loginAction } from "./components/auth/Login";

//Dashboard
import Dashboard from "./components/auth/Dashboard";

//Accounting and Finance
import ViewAllAPVContainer, {loader as apvLoader} from "./components/accounting_and_finance/accounts_payable_voucher/VIewAllAPVContainer";
import ViewAllAccount, {loader as accountsLoader} from "./components/accounting_and_finance/account_center/ViewAllAccountsContainer";
import CVContainer, {loader as cvLoader} from "./components/accounting_and_finance/cash_voucher/CVContainer";
import RFPContainer, {loader as rfpLoader} from "./components/accounting_and_finance/request_for_payment/RFPContainer";
import JVContainer, {loader as jvLoader} from "./components/accounting_and_finance/journal_voucher/JVContainer";

//Identity Management
import RolesContainer, {loader as rolesLoader} from "./components/identity_management/role_management/RolesContainer";
import ModuleContainer, {loader as moduleLoader} from "./components/identity_management/module_management/ModuleContainer";
import PermissionContainer, {loader as permissionLoader} from "./components/identity_management/permission_management/PermissionContainer";
import CreatePermission, {action as permissionAction} from "./components/identity_management/permission_management/CreatePermission";
import PDetailsContainer, {loader as permissionDetails, action as permissionStatus} from "./components/identity_management/permission_management/PDetailsContainer";
import EditPermission, {action as editPermission} from "./components/identity_management/permission_management/EditPermission";
import UsersContainer, {loader as userLoader} from "./components/identity_management/user_management/UsersContainer";
import CreateUser, {action as createUserAction} from "./components/identity_management/user_management/CreateUser";
import DetailsContainer, {loader as userDetailsLoader, action as userAction} from "./components/identity_management/user_management/DetailsContainer";
import EditUser, {action as updateUser} from "./components/identity_management/user_management/EditUser";

//Procurement
import SupplierContainer, {loader as supplierLoader} from "./components/procurement/supplier_center/SupplierContainer";
import ItemsContainer, {loader as itemLoader} from "./components/procurement/item_center/ItemsContainer";
import PRContainer, {loader as prLoader} from "./components/procurement/purchase_request/PRContainer";
import POContainer, {loader as poLoader} from "./components/procurement/purchase_order/POContainer";
import RRContainer, {loader as rrLoader} from "./components/procurement/receiving_receipt/RRContainer";

//Error page
import ErrorPage from "./components/errorPage/ErrorPage";
// import { authTokenChecker } from "./utils/authChecker";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import {loginValidator } from "./helpers/Authenticated";
// import authenticated from "./helpers/Authenticated";
// import useAuth from "./helpers/useAuth";




const App = () => {
  // const { authHandler } = useAuth();

  const router = createBrowserRouter([
    // {
    //   element: <Authenticated />,
    //   children: [
        {
          path: "",
          element: (
               <AuthLayout>
                 <Login />
               </AuthLayout>
          ),
          action: loginAction,
          errorElement: <ErrorPage />,
          loader: loginValidator,
        },
    //   ],
    // },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "dashboard",
          element: (
              <Layout>
                <Dashboard />
              </Layout>
          ),
        },
        {
          path: "account-center",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <ViewAllAccount />
                </Layout>
              ),
              loader: accountsLoader,
            },
          ],
        },
        {
          path: "apv",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <ViewAllAPVContainer />
                </Layout>
              ),
              loader: apvLoader,
            },
            // {
            //   path: 'add_apv',
            //   element: (
            //     <Layout>
            //       <AddAPV />
            //     </Layout>
            //   )
            // }
          ],
        },
        {
          path: "cash-voucher",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <CVContainer />
                </Layout>
              ),
              loader: cvLoader,
            },
          ],
        },
        {
          path: "rfp",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <RFPContainer />
                </Layout>
              ),
              loader: rfpLoader,
            },
          ],
        },
        {
          path: "jv",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <JVContainer />
                </Layout>
              ),
              loader: jvLoader,
            },
          ],
        },
        {
          path: "role-management",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <RolesContainer />
                </Layout>
              ),
              loader: rolesLoader,
            },
          ],
        },
        {
          path: "module-management",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <ModuleContainer />
                </Layout>
              ),
              loader: moduleLoader,
            },
          ],
        },
        {
          path: "permission-management",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <PermissionContainer />
                </Layout>
              ),
              loader: permissionLoader,
            },
            {
              path: "add_permission",
              element: (
                <Layout>
                  <CreatePermission />
                </Layout>
              ),
              action: permissionAction,
            },
            {
              path: ":permissionId",
              id: "permission-details",
              loader: permissionDetails,
              children: [
                {
                  index: true,
                  element: (
                    <Layout>
                      <PDetailsContainer />
                    </Layout>
                  ),
                  action: permissionStatus,
                },
                {
                  path: 'edit',
                  element: (
                    <Layout>
                      <EditPermission />
                    </Layout>
                  ),
                  action: editPermission,
                }
              ],
            },
          ],
        },
        {
          path: "user-management",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <UsersContainer />
                </Layout>
              ),
              loader: userLoader,
            },
            {
              path: "add_user",
              element: (
                <Layout>
                  <CreateUser />
                </Layout>
              ),
              action: createUserAction,
            },
            {
              path: ":userId",
              id: "user-details",
              loader: userDetailsLoader,
              children: [
                {
                  index: true,
                  element: (
                    <Layout>
                      <DetailsContainer />
                    </Layout>
                  ),
                  action: userAction,
                },
                {
                  path: 'edit',
                  element: (
                    <Layout>
                      <EditUser />
                    </Layout>
                  ),
                  action: updateUser
                }
              ],
            },
          ],
        },
        {
          path: "supplier-center",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <SupplierContainer />
                </Layout>
              ),
              loader: supplierLoader,
            },
          ],
        },
        {
          path: "item-center",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <ItemsContainer />
                </Layout>
              ),
              loader: itemLoader,
            },
          ],
        },
        {
          path: "purchase-request",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <PRContainer />
                </Layout>
              ),
              loader: prLoader,
            },
          ],
        },
        {
          path: "purchase-order",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <POContainer />
                </Layout>
              ),
              loader: poLoader,
            },
          ],
        },
        {
          path: "receiving-receipt",
          children: [
            {
              index: true,
              element: (
                <Layout>
                  <RRContainer />
                </Layout>
              ),
              loader: rrLoader,
            },
          ],
        },
      ]
    }
    
  ]);
  return (
    <RouterProvider router={router} />
  )
    
};

export default App;
