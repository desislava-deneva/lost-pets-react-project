import { createContext, useState } from "react";

export const ValidationContexts = createContext();


export const ValidationProviders = ({
    children
}) => {
    const [validationForm, setValidationForm] = useState({ name: '', img: '', dataLost: '', city: '', neighborhood: '', type: '', description: '' });
    const [pet, setPet] = useState({ name: '', img: '', dataLost: '', city: '', neighborhood: '', type: '', description: '' });


    const validateFormData = (e) => {
        const eventValue = e.target.value;
        const eventName = e.target.name;

        if (eventName === "name") {
            eventValue.length < 2 ?
                setValidationForm({ ...validationForm, name: false }) :
                setValidationForm({ ...validationForm, name: true });
        } else if (eventName === "img") {
            const URL_PATTERN = /^https?:\/\/(.+)/;
            URL_PATTERN.test(eventValue) ?
                setValidationForm({ ...validationForm, img: true })
                : setValidationForm({ ...validationForm, img: false });
        } else if (eventName === "dataLost") {
            const LOST_DATA_PATTERN = /^[\d]{2}.[\d]{2}.[\d]{4}$/;
            LOST_DATA_PATTERN.test(eventValue) ?
                setValidationForm({ ...validationForm, dataLost: true })
                : setValidationForm({ ...validationForm, dataLost: false })
        } else if (eventName === "city") {
            eventValue.length < 3 ?
                setValidationForm({ ...validationForm, city: false }) :
                setValidationForm({ ...validationForm, city: true });
        } else if (eventName === "neighborhood") {
            eventValue.length < 3 ?
                setValidationForm({ ...validationForm, neighborhood: false }) :
                setValidationForm({ ...validationForm, neighborhood: true });
        } else if (eventName === "birthYear") {
            Number(eventValue) < 2000 || Number(eventValue) > 2022 ?
                setValidationForm({ ...validationForm, birthYear: false }) :
                setValidationForm({ ...validationForm, birthYear: true })
        } else if (eventName === "type") {
            eventValue === 'Dog' || eventValue === 'Cat' ?
                setValidationForm({ ...validationForm, type: true }) :
                setValidationForm({ ...validationForm, type: false })
        } else if (eventName === "description") {
            eventValue.length > 500 ?
                setValidationForm({ ...validationForm, description: false }) :
                setValidationForm({ ...validationForm, description: true })
        }
    }

    const onChangeHandler = (e) => {
        if (e.target.name === "name") {
            setPet({ ...pet, name: e.target.value })
        } else if (e.target.name === "img") {
            setPet({ ...pet, img: e.target.value })
        } else if (e.target.name === "dataLost") {
            setPet({ ...pet, dataLost: e.target.value })
        } else if (e.target.name === "city") {
            setPet({ ...pet, city: e.target.value })
        } else if (e.target.name === "neighborhood") {
            setPet({ ...pet, neighborhood: e.target.value })
        } else if (e.target.name === "birthYear") {
            setPet({ ...pet, birthYear: e.target.value })
        } else if (e.target.name === "type") {
            setPet({ ...pet, type: e.target.value })
        } else if (e.target.name === "description") {
            if (e.target.value.length > 500) {
                alert('Description must be <= 500 charecters');
                throw console.error('Description must be <= 500 charecters');
            }
            setPet({ ...pet, description: e.target.value })
        }
    }

    return (
        <ValidationContexts.Provider value={{ validateFormData, validationForm, onChangeHandler, pet }} >
            {children}
        </ValidationContexts.Provider >
    )
}
