import { useDispatch } from 'react-redux';
import { addToast, deleteToast } from '../redux/toastSlice';

const useToast = (delay) => {
    const dispatch = useDispatch();
    
    const toast = ({toastType, title, description, configuration }) => {
        const id = Math.random().toString(36).substring(2, 9);
       
        dispatch(addToast(
            {
                toast: {
                    toastType, title, description, id
                },
                configuration: configuration
            }
        )
          
        )

        setTimeout(() => {
            dispatch(deleteToast(id)) 
        }, 5000)
        

    }

   


    return toast;
}

export default useToast;