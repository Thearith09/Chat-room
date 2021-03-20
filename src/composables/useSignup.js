import { ref } from "@vue/reactivity";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const signup = async (email, password, displayName) => {
    error.value = null;

    try {
        const response = await projectAuth.createUserWithEmailAndPassword(email, password);
        if (!response) {
            throw new Error("Signup didn't complete.");
        }
        await response.user.updateProfile({ displayName });

        return response;
        
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
    }
};

const useSingup = () => {
    return { error, signup };
}

export default useSingup;