import { Book } from '../../book/models/book.model';
import { Librarian } from '../../librarians/models/librarian.model';
import { Student } from '../../students/models/student.model';

export class RecordsData {
  id!: number;
  knjiga!: Book;
  student!: Student;
  bibliotekar0!: Librarian;
  borrow_date!: string;
  return_date!: string;
  status!: string;
  action_date!: string;
}
