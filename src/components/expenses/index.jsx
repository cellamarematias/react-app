/* eslint-disable array-callback-return */
import BillsListItem from "components/shared/bill";
import Modal from "components/shared/modal";
import { ButtonOption } from '../shared/buttonOption';
import { BsTrash, BsSearch } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import firebaseApp from "helper";
import { deleteExpenses, editExpenses, getExpenses } from "redux/expenses/thunks";
import loading from './loader.gif';

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import React from "react";
import styles from "./expenses.module.css";
import { findUserByEmail, getCoupleById } from "redux/couples/thunks";
import { getCouples, addCoupleThunks } from "redux/couples/thunks";
import { addExpenses } from "redux/expenses/thunks";

const Expenses = () => {
    const dispatch = useDispatch();
    const couples = useSelector(state => state.couples);
    const user = useSelector((state) => state.userLogged);
    const userSearch = useSelector((state) => state.couples.usersearch);
    const expenses = useSelector((state) => state.expenses);
    console.log(expenses.isLoading)
    const today = new Date();
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

    const schema = Joi.object({
        description: Joi.string().required().min(3).trim(),
        amount: Joi.number().required().min(1),
        date: Joi.date().default(() => {
            return new Date();
        }),
        user: Joi.string().required().min(3).trim(),
    });

    const schemaCouple = Joi.object({
        coupleName: Joi.string().required().min(3).trim(),
        email: Joi.string().required().min(3).trim(),
    });

    const schemaDashboard = Joi.object({
        dashboard: Joi.string().required(),
        isDefault: Joi.boolean(),
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

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 }
    } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(schemaCouple)
    });

    const {
        register: register3,
        handleSubmit: handleSubmit3,
        formState: { errors: errors3 }
    } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(schemaDashboard)
    });

    useEffect(() => {
        try {
            dispatch(getCouples(user.user.uid));
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, user.user.uid]);

    useEffect(() => {
        try {
            dispatch(getExpenses(couples.coupleSelected[0]?._id));
        } catch (error) {
            console.error(error);
        }
    }, [couples.coupleSelected, dispatch]);

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isAddingCouple, setIsAddingCouple] = useState(false);
    const [isSelectingDashboard, setIsSelectingDashboard] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isModalDelete, setIsModalDelete] = useState(false, { id: null });
    const [isEditing, setIsEditing] = useState(false, {
        id: '',
        coupleId: '',
        userId: '',
        name: '',
        amount: '',
        date: '',
    });
    let total = 0;
    let totalUserOne = 0;
    let totalUserTwo = 0;
    let numb = 0;
    let difference = 0;
    let userTop = '';
    let userBottom = '';
    let userTopId = '';

    const calulator = () => {
        // eslint-disable-next-line array-callback-return
        expenses.expensesList.map((item) => {
            total += item.amount;
            if (item.userId._id === couples.coupleSelected[0]?.userOne._id) {
                totalUserOne += item.amount;
            } else {
                totalUserTwo += item.amount;
            }
        });
        let divide = total / 2;
        if (totalUserOne > totalUserTwo) {
            numb = divide - totalUserTwo;
            difference = numb.toFixed(2);
            userTop = (couples.coupleSelected[0]?.userTwo.fullName)?.split(" ")[0];
            userTopId = couples.coupleSelected[0]?.userTwo._id;
            userBottom = (couples.coupleSelected[0]?.userOne.fullName)?.split(" ")[0];
        } else {
            numb = divide - totalUserOne;
            difference = numb.toFixed(2);
            userTop = (couples.coupleSelected[0]?.userOne.fullName)?.split(" ")[0];
            userTopId = couples.coupleSelected[0]?.userOne._id;
            userBottom = (couples.coupleSelected[0]?.userTwo.fullName)?.split(" ")[0];
        }
        return totalUserOne;
    }

    calulator();
    const setBalance = () => {
        setValue('amount', (difference * 2), { shouldValidate: true });
        setValue('description', 'Balance to $0.00');
        setValue('user', userTopId, { shouldValidate: true });
    }

    const searchUser = (e) => {
        const value = document.getElementById("email").value;
        dispatch(findUserByEmail(value));
    }

    const addCouple = (data) => {
        const newCouple = {
            name: data.coupleName,
            userOne: user.user.uid,
            userTwo: userSearch._id,
        }
        dispatch(addCoupleThunks(newCouple));
        setIsAddingCouple(false);
    }

    const selectDashboard = (data) => {
        dispatch(getCoupleById(data.dashboard));
        dispatch(getExpenses(couples.coupleSelected[0]?._id));
        setIsSelectingDashboard(false);
    }

    const show = () => {
        setShowModal(true);
    }

    const addBillForm = (data) => {
        const newExpense = {
            coupleId: couples.coupleSelected[0]?._id,
            userId: data.user,
            name: data.description,
            amount: data.amount,
            date: data.date,
        }
        try {
            dispatch(addExpenses(newExpense));
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
        reset();
    }

    const editExpense = (data) => {
        setIsAdding(false);
        const dateFormated = new Date(data.date).toISOString().substr(0, 10);
        setIsEditing({
            setIsEditing: true,
            id: data._id,
            coupleId: data.coupleId,
            userId: data.userId,
            name: data.name,
            amount: data.amount,
            date: dateFormated,
        });
        setValue('amount', data.amount);
        setValue('description', data.name);
        setValue('date', dateFormated);
    }

    const edit = (data) => {
        const itemEdited = {
            id: isEditing.id,
            coupleId: isEditing.coupleId,
            userId: data.user,
            name: data.description,
            amount: data.amount,
            date: data.date,
        }
        try {
            dispatch(editExpenses(itemEdited));
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    }

    const deleteExpense = () => {
        const itemEdited = {
            id: isEditing.id,
        }
        try {
            dispatch(deleteExpenses(itemEdited));
            setIsEditing(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        expenses.isLoading ? (
            <div className={styles.loading}>
                <img src={loading} alt="loading..." />
            </div>
        ) : (
            <div>
                <Modal isOpen={showModal} setIsOpen={setShowModal} title={isAdding ? 'Nuevo gasto' : 'Editar gasto'}>
                    <form className={styles.form} onSubmit={handleSubmit(isAdding ? addBillForm : edit)}>
                        <div className={styles.formFlex}>
                            <div className={styles.flex}>
                                <input type="number" step="any" className={styles.billInput} name="amount" id="amount" placeholder="$" {...register("amount")} />
                                {errors.amount && <p className={styles.errorP}>Este campo es requerido</p>}
                                {isAdding ? <><span className={styles.balance}>Poner en $0</span><input type="checkbox" onChange={setBalance} /></> : ''}
                            </div>
                            <div className={styles.flex}>
                                <div>
                                </div>
                                <textarea className={styles.textAreaExpenses} name="description" id="description" placeholder="Descripción" {...register("description")} />
                                {errors.description && <p className={styles.errorP}>Este campo es requerido</p>}
                            </div>
                            <div className={styles.flex}>
                                <div className={styles.title}>
                                    <input className={styles.dateExpenses} type="date" name="date" id="date" {...register("date")} defaultValue={defaultValue} />
                                </div>
                            </div>
                            <div className={styles.flex}>
                                <div className={styles.selectIcon}>
                                    <div className={styles.title}>
                                        <select className={styles.select} name="user" id="user" {...register("user")}>
                                            <option value="">Elegir usuario</option>
                                            <option value={typeof (couples.coupleSelected[0]) !== 'undefined' ? couples.coupleSelected[0].userOne._id : 'No data'}>
                                                {typeof (couples.coupleSelected[0]) !== 'undefined' ? couples.coupleSelected[0].userOne.fullName : 'No data'} </option>
                                            <option value={typeof (couples.coupleSelected[0]) !== 'undefined' ? couples.coupleSelected[0].userTwo._id : 'No data'}>
                                                {typeof (couples.coupleSelected[0]) !== 'undefined' ? couples.coupleSelected[0].userTwo.fullName : 'No data'} </option>
                                        </select>
                                        {errors.user && <p className={styles.errorP}>Este campo es requerido</p>}
                                        {isAdding ? '' :
                                            <BsTrash className={styles.delete} onClick={() => {
                                                setShowModal(false);
                                                deleteExpense();
                                                setIsModalDelete(true);
                                            }} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.flex}>
                                <ButtonOption option={'yes'} text={'Confirmar'}></ButtonOption>
                                <ButtonOption
                                    option={'no'}
                                    callback={() => {
                                        setShowModal(false);
                                        reset();
                                    }}
                                    text={'Cancelar'}
                                ></ButtonOption>
                            </div>
                        </div>
                    </form>
                </Modal>
                {/* Add couple modal */}
                <Modal isOpen={isAddingCouple} setIsOpen={setIsAddingCouple} title={'Nueva pareja'}>
                    <form className={styles.form} onSubmit={handleSubmit2(addCouple)}>
                        <div className={styles.formFlex}>
                            <div className={styles.flex}>
                                <input type="text" className={styles.billInput} name="coupleName" id="coupleName" placeholder="Nombre" {...register2("coupleName")} />
                                {errors2.coupleName && <p className={styles.errorP}>Este campo es requerido</p>}
                            </div>
                            <div className={styles.flex}>
                                <input type="email" className={styles.billInput} name="email" id="email" placeholder="Email segundo usuario" {...register2("email")} />
                                {errors2.email && <p className={styles.errorP}>Este campo es requerido</p>}
                            </div>
                            <div className={styles.flex}>
                                <BsSearch className={styles.delete} onClick={() => {
                                    searchUser(false);
                                }} />
                            </div>
                            <p className={styles.search}>{userSearch.fullName ? userSearch.fullName : userSearch.message}</p>
                            <div className={styles.modalbuttons}>
                                {userSearch.error ? '' : <ButtonOption option={'yes'} text={'Confirmar'} ></ButtonOption>}
                                <ButtonOption
                                    option={'no'}
                                    callback={() => {
                                        setIsAddingCouple(false);
                                        reset();
                                    }}
                                    text={'Cancelar'}
                                ></ButtonOption>
                            </div>
                        </div>
                    </form>
                </Modal>
                {/* select dashboard modal */}
                <Modal isOpen={isSelectingDashboard} setIsOpen={setIsSelectingDashboard} title={'Mi lista'}>
                    <form className={styles.form} onSubmit={handleSubmit3(selectDashboard)}>
                        <button className={styles.addCoupleButton} onClick={() => { setIsAddingCouple(true); setIsSelectingDashboard(false); }} >Add</button>
                        <div className={styles.formFlex}>
                            <div>
                                <label htmlFor="dashboard">Select dashboard:</label>
                                <select name="dashboard" id="dashboard" {...register3("dashboard")}>
                                    {couples.couplesList.map((dashboard) => {
                                        if (dashboard.userOne._id === user.user.uid || dashboard.userTwo._id === user.user.uid) {
                                            return (
                                                <option key={dashboard._id} value={dashboard._id}>{dashboard.name}</option>
                                            );
                                        }
                                    })}
                                </select>
                                {errors3.dashboard && <p className={styles.errorP}>Este campo es requerido</p>}
                            </div>
                            <div className={styles.modalbuttons}>
                                <ButtonOption option={'yes'} text={'Confirmar'}></ButtonOption>
                                <ButtonOption
                                    option={'no'}
                                    callback={() => {
                                        setIsSelectingDashboard(false);
                                        reset();
                                    }}
                                    text={'Cancelar'}
                                ></ButtonOption>
                            </div>
                        </div>
                    </form>
                </Modal>

                <div className={styles.billsContainer}>
                    <div className={styles.dashboard}>
                        <h1 className={styles.title} onClick={() => setIsSelectingDashboard(true)}>Dashboard:</h1>
                        <h4>{couples.coupleSelected[0]?.name ? couples.coupleSelected[0].name : ""}</h4>
                    </div>
                    <div className={styles.user1}>
                        <h4>{userTop}</h4>
                    </div>
                    <div className={styles.circle}>
                        <h4>Debe</h4>
                        <h3>${difference}</h3>
                        <h4>a</h4>
                    </div>
                    <div className={styles.user2}>
                        <h4>{userBottom}</h4>
                    </div>
                    <div >
                        <button className={styles.addButton} onClick={() => {
                            show();
                            setIsAdding(true);
                        }}>+</button>
                    </div>
                    <div className={styles.list}>
                        <h4>List</h4>
                        {expenses.expensesList.map((expense) => {
                            return (
                                <BillsListItem key={expense._id} data={expense} func={(item) => {
                                    editExpense(item);
                                    setIsAdding(false);
                                    show();
                                }} />
                            );
                        }
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
export default Expenses;