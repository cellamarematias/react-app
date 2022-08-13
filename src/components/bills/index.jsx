import BillsListItem from "components/shared/bill";
import Modal from "components/shared/modal";
import { ButtonOption } from '../shared/buttonOption';
import { BsTrash, BsFillCheckCircleFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebaseApp from "helper";
import { getAuth } from "firebase/auth";
import { addBill, editBill, getBills } from "redux/bills/thunks";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import React from "react";
import styles from "./bills.module.css";
import { getUser } from "redux/auth/thunks";
import { addExpense, getCouples } from "redux/couples/thunks";

const Bills = () => {
    const dispatch = useDispatch();
    const couples = useSelector(state => state.couples);
    const user = useSelector((state) => state.userLogged);
    //dispatch(getUser(user.uid));
    //console.log(user.user.uid)

    const filteredCouples = couples.couplesList.filter(item => {
        console.log(item)
        return item.users.filter(item => {
            console.log(item)
            return item.couples === user.user.uid
        })
    });
    //console.log(filteredCouples);



    // need to change this in the future to add new couples to same user

    console.log(user.user);



    const [isAdding, setIsAdding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false, { id: null });
    const [isEditing, setIsEditing] = useState(false, {
        id: '',
        title: '',
        description: '',
        date: '',
        done: '',
    });

    useEffect(() => {
        try {
        dispatch(getCouples());
        } catch (error) {
        console.error(error);
        }
    }, [dispatch, user.user.uid]);


    const schema = Joi.object({
        description: Joi.string().required().min(3).trim(),
        amount: Joi.number().required().min(1),
        date: Joi.date().default(() => {
        return new Date();
        }),
        user: Joi.string().required().min(3).trim(),
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(schema)
    });

    useEffect(() => {
        reset();
    }, []);

    const show = () => {
        setShowModal(true);
        }

    const addBillForm = (data) => {
        //onsole.log(coupleId);
        const newExpense = [{
            description: data.description,
            amount: data.amount,
            date: data.date,
            user: data.user,
        }]

        console.log(newExpense);
        try {
            dispatch(addExpense(newExpense, "62f25bcb4c110e9a617649c0"));
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    }

    const today = new Date();
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

    return (
        <div>
            <Modal isOpen={showModal} setIsOpen={setShowModal} title={isAdding ? 'New Bill' : 'Edit Bill'}>
                <form  className={styles.form} onSubmit={handleSubmit(isAdding ? addBillForm : editBill)}>
                <div className={styles.formFlex}>
                    <div>
                    </div>
                        <input type="number" className={styles.billInput} name="amount" id="amount" placeholder="$" {...register("amount")} />
                        {errors.amount && <p className={styles.errorP}>This field is required</p>}
                        <BsTrash className={styles.delete} onClick={() => {
                            setShowModal(false);
                            setIsModalDelete(true);
                        } } />
                    </div>
                    <div className={styles.formFlex}>
                        <div>
                        </div>
                        <textarea className={styles.billInput} name="description" id="description" placeholder="Description" {...register("description")}/>
                        {errors.description && <p className={styles.errorP}>This field is required</p>}
                    </div>
                    <div className={styles.formFlex}>
                        <div className={styles.title}>
                            <input type="date" name="date" id="date" {...register("date")} defaultValue={defaultValue}/>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.title}>
                            <label htmlFor="user"></label>
                            <select name="user" id="user" {...register("user")}>
                                {couples.couplesList[0]?.users.map((couple) => {
                                    return (
                                        <option key={couple._id} value={couple._id}>{couple.fullName}</option>
                                    );
                                } )}
                            </select>
                        </div>
                    </div>
                    <div className={styles.modalbuttons}>
                        <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
                        <ButtonOption
                            option={'no'}
                            callback={() => {
                                setShowModal(false);
                                reset();
                            } }
                            text={'Cancel'}
                        ></ButtonOption>
                    </div>
                    </form>
                </Modal>
                <div className={styles.billsContainer}>
                    <div>
                        <h1 className={styles.title}>Couple's Dashboard</h1>
                    </div>
                    <div className={styles.user1}>
                        <h4>User 1</h4>
                    </div>
                    <div className={styles.circle}>
                        <h4>owes</h4>
                        <h3>$15.125</h3>
                        <h4>to</h4>
                    </div>
                    <div className={styles.user2}>
                        <h4>User 2</h4>
                    </div>
                    <div >
                        <button className={styles.addButton} onClick={() => {
                            show();
                            setIsAdding(true);
                        }}>+</button>
                    </div>
                    <div className={styles.list}>
                        <h4>List</h4>
                        {couples.couplesList[0]?.expenses.map((bill) => {
                            return (
                                <BillsListItem key={bill._id} data={bill} />
                            );
                        }
                        )}
                    </div>
                </div>
        </div>
    );
    }
export default Bills;