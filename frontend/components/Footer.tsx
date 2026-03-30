import { isDate } from "util/types";
export default function Footer() {
    return (
        <footer className="bg-braun-800 p-4 text-center text-red text-sm">
            <p>&copy; {new Date().getFullYear()}  تمامی حقوق محفوظ است</p>
        </footer>
    );
}