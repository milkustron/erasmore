export interface ChecklistItem {
    id: number;
    stage: string;
    task: string;
    link: string | undefined;
    description: string;
}
