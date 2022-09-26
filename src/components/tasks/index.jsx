/* eslint-disable array-callback-return */
import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import loading from '../expenses/loading.gif';

import { addTaskThunks, editTaskThunks, deleteTaskThunks } from "../../redux/tasks/thunks";

import styles from './tasks.module.css';
import Cards from '../shared/tasks-cards/index';
import Modal from '../shared/modal';
import { ButtonOption } from '../shared/buttonOption';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/tasks/thunks';
import { BsTrash } from "react-icons/bs";
import { } from "react-icons/bs";
// eslint-disable-next-line no-unused-vars
import firebaseApp from "helper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Task = () => {
    const user = useSelector((state) => state.userLogged);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasksList);
    const tasksLoading = useSelector((state) => state.tasks.isLoading);
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
    let filteredList = [];

    const filterData = () => {
        filteredList = tasks.filter((item) => {
            return item.uid === user.user.uid;
        });
        return filteredList;
    };

    filterData();

    const today = new Date();
    const date = today.setDate(today.getDate() - 1);
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

    const schema = Joi.object({
        title: Joi.string().required().min(3).trim(),
        description: Joi.string().min(3).trim(),
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
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(schema)
    });

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        try {
            dispatch(getTasks());
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const show = () => {
        setShowModal(true);
    }

    // ADD TASK
    const addTask = (data) => {
        setShowModal(false);
        dispatch(addTaskThunks(data));
        reset();
        setShowModal(false);
    };

    // Richtext

    useEffect(() => {
        register("description", { required: true, minLength: 11 });
    }, [register]);

    const onEditorStateChange = (editorState) => {
        setValue("description", editorState);
    };

    const editorContent = watch("description");

    const editTask = (data) => {
        // format date
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('date', new Date(data.date).toISOString().substr(0, 10));
        setValue('done', data.done);
        let formatedDate = new Date(data.date).toISOString().substr(0, 10);
        data.date = formatedDate;
        setIsEditing({ id: data._id });
    };

    const editedTask = (data) => {
        const editedTask = {
            id: isEditing.id,
            title: data.title,
            description: data.description,
            date: data.date,
            done: data.done
        };
        dispatch(editTaskThunks(editedTask));
        setShowModal(false);
        reset();
    }

    const deleteItem = () => {
        let id = isEditing.id;
        dispatch(deleteTaskThunks(id));
        setIsModalDelete(!setIsModalDelete);
        reset();
    };

    console.log(tasks)

    return (
        tasksLoading ? (
            (
                <div className={styles.loading}>
                    <img src={loading} alt="loading..." />
                </div>
            )
        ) : (
            <div>
                {/* Modal for deleting task */}
                <Modal isOpen={isModalDelete} setIsOpen={setIsModalDelete} title={'Delete task'}>
                    <h3>Está seguro?</h3>
                    <div className={styles.modalbuttons}>
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
                    <form className={styles.form} onSubmit={handleSubmit(isAdding ? addTask : editedTask)}>
                        <div className={styles.formFlex}>
                            <div>
                            </div>
                            <input type="textarea" className={styles.title} name="title" id="title" placeholder="Title" {...register("title")} />
                            {isAdding ? '' : (
                                <BsTrash className={styles.delete} onClick={() => {
                                    setShowModal(false);
                                    setIsModalDelete(true);
                                }} />
                            )}
                        </div>
                        {errors.title && <p className={styles.errorP}>This field is required</p>}
                        <div className={styles.formFlex}>
                            <div className={styles.tasksCardContainer}>
                                <ReactQuill
                                    theme="snow"
                                    value={editorContent}
                                    onChange={onEditorStateChange}
                                    name="description"
                                />
                                {errors.description && <p className={styles.errorP}>This field is required</p>}
                            </div>
                        </div>
                        <div className={styles.formFlex}>
                            <div className={styles.title}>
                                <input className={styles.dateTasks} type="date" name="date" id="date" {...register("date")} defaultValue={defaultValue} />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.title}>
                                <select className={styles.tasksSelect} name="done" id="done" {...register("done")}>
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
                                }}
                                text={'Cancel'}
                            ></ButtonOption>
                        </div>
                    </form>
                </Modal>
                <button className={styles.addButton} onClick={() => {
                    show();
                    setIsAdding(true);
                }} >Agregar</button>
                <div className={styles.tasksContainer}>
                    <div className={styles.column}>
                        <div className={styles.taskCard1}>
                            <h4>Pendiente</h4>
                            {/* <Cards onClick={console.log('kakak')}></Cards> */}
                            {filteredList.map((task, index) => {
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
                            })}
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.taskCard2}>
                            <h4>Haciendo</h4>
                            {filteredList.map((task, index) => {
                                if (task.done === 'inProgress') {
                                    prog++;
                                    return (
                                        <Cards key={index} data={task} i={prog} callback={() => {
                                            editTask(task, task._id);
                                            setIsAdding(false);
                                            setShowModal(true);
                                        }} />
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.taskCard3}>
                            <h4>Revisión</h4>
                            {filteredList.map((task, index) => {
                                if (task.done === 'inReview') {
                                    rev++;
                                    return (
                                        <Cards key={index} data={task} i={rev} callback={() => {
                                            editTask(task, task._id);
                                            setIsAdding(false);
                                            setShowModal(true);
                                        }} />
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.taskCard4}>
                            <h4>Hecha</h4>
                            {filteredList.map((task, index) => {
                                if (task.done === 'done') {
                                    don++;
                                    return (
                                        <Cards key={index} data={task} i={don} callback={() => {
                                            editTask(task, task._id);
                                            setIsAdding(false);
                                            setShowModal(true);
                                        }} />
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Task;