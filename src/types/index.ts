import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Note = {
  _id: string; // or any other identifier type
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  isPinned: boolean;
};

export type Notes = Note[]; // Array of `Note`
