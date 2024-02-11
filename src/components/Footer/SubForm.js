import {useForm} from "react-hook-form";
import horseImg from "../../images/Ireland-horsw.jpeg"

export function SubscriptionForm() {
    const { register } = useForm();
    const backgroundImage = {backgroundImage: `url(${horseImg})`, backgroundSize:"cover", backgroundRepeat:"no-repeat"}

    return (
        <div style={backgroundImage} className="subForm">
        <form method="post" className="form">
            <div className="mb-3">
            <label htmlFor="inputName" className="form-label"></label>
            <input type="text" className="form-control" {...register("name", {required:true})} placeholder="↪ Your Name" />
            <label htmlFor="inputEmail" className="form-label"></label>
            <input type="email" className="form-control" {...register("email", {required:true})} placeholder="@ Email Address" />
            </div>
            <input type="submit" value="Submit" className='btn btn-success' />
        </form>
        </div>
    )
};
