import { getUser } from "@/server/user/user.service";
import { redirect } from "next/navigation";
 
const DashboardPage = async () => {
    const user = await getUser();
    if(!user){
        redirect("/");
    }

        if(user?.data?.role === "ADMIN"){
            redirect("/dashboard/admin");
        } else if (user?.data?.role === "LANDLORD"){
            redirect("/dashboard/landlord");
        } else if (user?.data?.role === "TENANT"){
            redirect("/dashboard/tenant");
        }
};

export default DashboardPage;