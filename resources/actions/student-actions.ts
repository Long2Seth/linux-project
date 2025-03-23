import axios from 'axios';

export const enableStudent = async (studentId: string) => {
    await axios.patch(`/user/${studentId}/enable`);
};

export const disableStudent = async (studentId: string) => {
    await axios.patch(`/user/${studentId}/disable`);
};
