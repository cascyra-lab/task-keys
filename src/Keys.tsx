import { useState } from 'react';

interface IItem {
    id: number;
    name: string;
}

export function Keys(props: { sorting: 'ASC' | 'DESC'; initialData: IItem[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempName, setTempName] = useState('');

    const sortedData = [...props.initialData].sort((a, b) => {
        return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
    });

    const handleItemClick = (item: IItem) => {
        setEditingId(item.id);
        setTempName(item.name);
    };

    const handleSave = (item: IItem) => {
        item.name = tempName;
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, item: IItem) => {
        if (e.key === 'Enter') {
            handleSave(item);
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <ul>
            {sortedData.map((item) => (
                <li key={item.id}>
                    {editingId === item.id ? (
                        <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, item)}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => handleItemClick(item)}>
                            {item.name}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
