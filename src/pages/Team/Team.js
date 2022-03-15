import {useDispatch, useSelector} from "react-redux";
import {getTeam} from "../../redux/team/team-selectors";
import {Button, Form, Space, Table, Input, } from 'antd';
import {useEffect, useState} from "react";
import Modal from "antd/es/modal/Modal";
import {loadTeam} from "../../services/data-integration";
import Checkbox from "antd/es/checkbox/Checkbox";
import { message } from 'antd';
import { setTeamMember} from "../../redux/team/team-actions";
import {getTeamMemberByNick} from "../../utils/teamUtils";

const Team = () => {
    const team = useSelector(getTeam);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [teamMemberToEdit, setTeamMemberToEdit] = useState(null);
    const [EditForm] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if ( team.length === 0) {
            loadTeam();
        }
    }, [team]);

    useEffect(() => {
        if(teamMemberToEdit) {
            EditForm.setFieldsValue({
                name: teamMemberToEdit.name,
                surname: teamMemberToEdit.surname,
                nick: teamMemberToEdit.nick,
                active: teamMemberToEdit.active
            });
        }
    })

    const onEditFinish = (values) => {
    }

    const handleOk = () => {

        const newTeamMember ={};
        newTeamMember.name = EditForm.getFieldValue('name');
        newTeamMember.surname = EditForm.getFieldValue('surname');
        newTeamMember.nick = EditForm.getFieldValue('nick');
        newTeamMember.active = EditForm.getFieldValue('active');
        newTeamMember.id = teamMemberToEdit.id;
        // check if a new nick is unique
        const isNickChanged = teamMemberToEdit.nick !== newTeamMember.nick;
        if (isNickChanged && getTeamMemberByNick(team, newTeamMember.nick)) {
            message.error('Nick must be unique!');
        } else {
            dispatch(setTeamMember(newTeamMember));
            setIsEditModalVisible(false);
        }

    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };
    const editTeamMemberHandler = (teamMember) => {
        setIsEditModalVisible(true);
        setTeamMemberToEdit(teamMember)
    };

    const dataForTable = team.map (teamMember => {return ({...teamMember, key: teamMember.id})});

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a,b) => a.surname < b.surname,
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
            sorter: (a,b) => a.surname < b.surname,
        },
        {
            title: 'Nick',
            dataIndex: 'nick',
            key: 'nick',
            sorter: (a,b) => a.surname < b.surname,
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => editTeamMemberHandler(record)}>Edit </Button>
                    <Button type="primary">Delete</Button>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Table
                dataSource={dataForTable}
                columns={columns}
            />
            {isEditModalVisible &&
            (<Modal title="Edit Team Member" visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form aria-orientation='horizontal' form={EditForm} onFinish={onEditFinish} name="EditTeamForm">
                    <Form.Item
                        label = 'Name'
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label = 'Surname'
                        name="surname"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label = 'Nick'
                        name="nick"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label = 'Active'
                        name="active"
                        valuePropName="checked"
                    >
                        <Checkbox />
                    </Form.Item>
                </Form>
            </Modal>)}
        </>

    )
}

export default Team;