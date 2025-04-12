// index.tsx або app.tsx (залежно від структури)
import React, { useEffect, useState } from 'react';

interface Fields {
    ПІБ: string;
    курс: string;
    група: string;
    форма_здобуття_освіти: string;
    факультет: string;
    телефон: string;
}

const CreateDocumentPage: React.FC = () => {
    const [templates, setTemplates] = useState<string[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [fields, setFields] = useState<Fields>({
        ПІБ: '',
        курс: '',
        група: '',
        форма_здобуття_освіти: '',
        факультет: '',
        телефон: ''
    });

    const API_URL = 'http://localhost:5000';

    useEffect(() => {
        refreshTemplates();
    }, []);

    const refreshTemplates = async () => {
        try {
            const response = await fetch(`${API_URL}/templates`);
            const data = await response.json();
            setTemplates(data);
        } catch (err) {
            alert('Помилка при завантаженні шаблонів');
        }
    };

    const uploadTemplate = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.docx';
        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    alert(`Шаблон "${result.filename}" успішно завантажено!`);
                    refreshTemplates();
                } else {
                    throw new Error(result.error);
                }
            } catch (error: any) {
                alert(`Помилка: ${error.message}`);
            }
        };
        input.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [e.target.id]: e.target.value });
    };

    const generateDocument = async (format: 'docx' | 'pdf') => {
        if (!selectedTemplate) {
            alert('Будь ласка, оберіть шаблон!');
            return;
        }

        for (const [key, value] of Object.entries(fields)) {
            if (!value.trim()) {
                alert(`Будь ласка, заповніть поле "${key}"!`);
                return;
            }
        }

        try {
            const response = await fetch(`${API_URL}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    template: selectedTemplate,
                    fields,
                    format
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const blob = await response.blob();
            const filenameHeader = response.headers.get('Content-Disposition');
            const filename = filenameHeader?.split('filename=')[1] || 'document';
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error: any) {
            alert(`Помилка: ${error.message}`);
        }
    };

    const clearFields = () => {
        setFields({
            ПІБ: '',
            курс: '',
            група: '',
            форма_здобуття_освіти: '',
            факультет: '',
            телефон: ''
        });
        setSelectedTemplate('');
    };

    return (
        <div>
            <div className="header" style={{ textAlign: 'center', marginBottom: 30 }}>
                <h1>Генератор документів</h1>
                <p>Заповніть поля та оберіть шаблон для генерації документу</p>
            </div>

            <div className="section">
                <h2>Вибір шаблону</h2>
                <select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}>
                    <option value="">-- Оберіть шаблон --</option>
                    {templates.map(tpl => (
                        <option key={tpl} value={tpl}>{tpl}</option>
                    ))}
                </select>
                <button onClick={refreshTemplates}>Оновити список</button>
                <button onClick={uploadTemplate}>Завантажити новий шаблон</button>
            </div>

            <div className="section">
                <h2>Дані для заповнення</h2>
                {Object.keys(fields).map(key => (
                    <div key={key}>
                        <label htmlFor={key}>{key}:</label>
                        <input id={key} value={(fields as any)[key]} onChange={handleChange} required />
                    </div>
                ))}
            </div>

            <div className="button-group" style={{ marginTop: 20, textAlign: 'center' }}>
                <button onClick={() => generateDocument('docx')}>Згенерувати DOCX</button>
                <button onClick={() => generateDocument('pdf')}>Згенерувати PDF</button>
                <button onClick={clearFields}>Очистити поля</button>
            </div>
        </div>
    );
};


export default CreateDocumentPage;
