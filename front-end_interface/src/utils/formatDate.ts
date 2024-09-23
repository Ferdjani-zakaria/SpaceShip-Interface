import moment from "moment";

export const formatDate = (dateString: string) => {
    return moment(dateString).format("DD / MMMM / HH:mm");
};
