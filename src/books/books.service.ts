import { Request, Response } from 'express';

import { Book } from './entities/book.entity';

import { AppDataSource } from '../common/config/db';

const booksRepository = AppDataSource.getRepository(Book);

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await booksRepository.save(req.body);

    res.status(201).json({ ...book });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const findBooks = async (req: Request, res: Response) => {
  try {
    const books = await booksRepository.find({});

    res.status(200).json(books);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const findBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await booksRepository.findOneBy({ id: +id });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const book = await booksRepository.findOneBy({ id: +id });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await booksRepository.save({
      id: +id,
      ...body,
    });

    // необходимо чтобы получить обновленное тело книги целиком а не только обновленные поля
    const updatedBook = await booksRepository.findOneBy({ id: +id });

    res.status(200).json(updatedBook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await booksRepository.findOneBy({ id: +id });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await booksRepository.remove(book);
    res.status(204).send();
  } catch (error: any) {}
};
