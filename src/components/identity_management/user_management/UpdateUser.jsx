import UserForm from './UserForm'

const UpdateUser = () => {
  const data = useRouteLoaderData("user-details");
  return (
    <UserForm />
  )
}

export default UpdateUser

export async function action({ request, params }) {
  const id = params.bankID;
  const data = await request.formData();

  const bankData = {
    bank_center_id: id,
    account_name: data.get("account_name"),
    account_nickname: data.get("account_nickname"),
    account_code: data.get("account_code"),
    bank_name: data.get("bank_name"),
    bank_type: data.get("bank_type"),
    bank_account_number: data.get("bank_account_number"),
  };
  

  const response = await fetch(
    "https://finance-best.fly.dev/api/bank_center/update_bank_account",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bankData),
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not save bank data." }, { status: 500 });
  }

  return redirect("..");
}
