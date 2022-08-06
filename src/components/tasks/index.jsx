import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { addTaskThunks, editTaskThunks, deleteTaskThunks } from "../../redux/tasks/thunks";

import styles from './tasks.module.css';
import Cards from '../shared/tasks-cards/index';
import Modal from '../shared/modal';
import { ButtonOption } from '../shared/buttonOption';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/tasks/thunks';
import { BsTrash, BsFillCheckCircleFill } from "react-icons/bs";
import {  } from "react-icons/bs";


const Task = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasksList);
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

    // Hook form
    const onSubmit = data => console.log(data);
    // tasks.map((task) => {
    //     console.log(task);
    // } );
    const today = new Date();
    const date = today.setDate(today.getDate() - 1);
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

    const schema = Joi.object({
        title: Joi.string().required().min(3).trim(),
        description: Joi.string().required(),
        done: Joi.string(),
        date: Joi.date().default(() => {
        return new Date();
        })
    });

    let pend = 0;
    let prog = 0;
    let rev = 0;
    let don = 0;

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

    useEffect(() => {
        try {
        dispatch(getTasks());
        } catch (error) {
        console.error(error);
        }
    }, []);

    const show = () => {
        setShowModal(true);
        }

      // ADD TASK
    const addTask = (data) => {
        console.log(data);
        setShowModal(false);
        dispatch(addTaskThunks(data));
        // setIsAdding(false);
        reset();
        // setShowModalMessage({
        //   showModalMessage: true,
        //   title: 'Message',
        //   message: 'Task created'
        // });
        setShowModal(false);
    };


    const editTask = (data) => {
        // format date
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('date', new Date(data.date).toISOString().substr(0, 10));
        setValue('done', data.done);
        let formatedDate = new Date(data.date).toISOString().substr(0, 10);
        data.date = formatedDate;
        setIsEditing({id: data._id});
    };

    const editedTask =  (data) => {
        console.log(data);
        const editedTask = {
            id: isEditing.id,
            title: data.title,
            description: data.description,
            date: data.date,
            done: data.done
        };
        console.log(editedTask);
        dispatch(editTaskThunks(editedTask));
        setShowModal(false);
        reset();
    }

    const deleteItem = () => {
        let id = isEditing.id;
        console.log(id);
        dispatch(deleteTaskThunks(id));
        setIsModalDelete(!setIsModalDelete);
        reset();
    };

    return (
        <div>
                    {/* Modal for deleting task */}
        <Modal isOpen={isModalDelete} setIsOpen={setIsModalDelete} title={'Delete task'}>
                <h3>Are you sure?</h3>
            <div className={styles.ButtonContainer}>
            <ButtonOption callback={deleteItem} option={'yes'} text={'Confirm'}></ButtonOption>
            <ButtonOption
                option={'no'}
                callback={() => {
                setIsModalDelete(false);
                reset();
                }}
                text={'Cancel'}
                ></ButtonOption>
            </div>
        </Modal>
            <Modal isOpen={showModal} setIsOpen={setShowModal} title={isAdding ? 'New Task' : 'Edit Task'}>
                <form  className={styles.form} onSubmit={handleSubmit(isAdding ? addTask : editedTask)}>
                <div className={styles.formFlex}>
                    <div>
                    </div>
                        <input type="textarea" className={styles.title} name="title" id="title" placeholder="Title" {...register("title")} />
                        {errors.title && <p className={styles.errorP}>This field is required</p>}
                        <BsTrash className={styles.delete} onClick={() => {
                            setShowModal(false);
                            setIsModalDelete(true);
                        } } />
                    </div>
                    <div className={styles.formFlex}>
                        <div>
                        </div>
                        <textarea className={styles.description}  name="description" id="description" placeholder="Description" {...register("description")}/>
                        {errors.description && <p className={styles.errorP}>This field is required</p>}
                    </div>
                    <div className={styles.formFlex}>
                        <div className={styles.title}>
                            <input type="date" name="date" id="date" {...register("date")} defaultValue={defaultValue}/>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.title}>
                            <label htmlFor="done">State</label>
                            <select name="done" id="done" {...register("done")}>
                                <option value="">---</option>
                                <option value="pending">Pending</option>
                                <option value="inProgress">In Progress</option>
                                <option value="inReview">In Review</option>
                                <option value="done">Done</option>
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
            <button className={styles.addButton} onClick={() => {
                show();
                setIsAdding(true);
            }} >add</button>
            <div className={styles.tasksContainer}>
                <div className={styles.column}>
                    <div className={styles.taskCard1}>
                        <h4>pending</h4>
                        {/* <Cards onClick={console.log('kakak')}></Cards> */}
                        {tasks.map((task, index) => {
                            if (task.done === 'pending') {
                                pend++;
                                return (
                                    <Cards key={index} data={task} i={pend} callback={() => {
                                        editTask(task, task._id);
                                        setIsAdding(false);
                                        setShowModal(true);
                                    }} />
                                );
                            }
                    } )}
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.taskCard2}>
                        <h4>in progress</h4>
                        {tasks.map((task, index) => {
                            if (task.done === 'inProgress') {
                                prog++;
                                return (
                                    <Cards key={index} data={task} i={prog}  callback={() => {
                                        editTask(task, task._id);
                                        setIsAdding(false);
                                        setShowModal(true);
                                    }} />
                                );
                            }
                    } )}
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.taskCard3}>
                        <h4>in review</h4>
                        {tasks.map((task, index) => {
                            if (task.done === 'inReview') {
                                rev++;
                                return (
                                    <Cards key={index} data={task} i={rev}  callback={() => {
                                        editTask(task, task._id);
                                        setIsAdding(false);
                                        setShowModal(true);
                                    }} />
                                );
                            }
                    } )}
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.taskCard4}>
                        <h4>done</h4>
                        {tasks.map((task, index) => {
                            if (task.done === 'done') {
                                don++;
                                return (
                                    <Cards key={index} data={task} i={don}  callback={() => {
                                        editTask(task, task._id);
                                        setIsAdding(false);
                                        setShowModal(true);
                                    }} />
                                );
                            }
                    } )}
                    </div>
                </div>
            </div>
        </div>
    )}

export default Task;