import { useSelector } from "react-redux";

export function useAuth() {
    const {email, token, id, data, guests, place, table} = useSelector(state => state.user);

    return{
        isAuth: !!email,
        email,
        token,
        id,
        isData: !!data,
        data,
        guests,
        place,
        isTable: !!table,
        table,
    };
}