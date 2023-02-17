import React from 'react';
import useSWR from 'swr'
import Select from 'react-select'

type Props = {};

const fetchModels = () => fetch('/api/get-engines').then(res => res.json())

const ModelSelection: React.FC<Props> = ({ }) => {
    // use to fecth data
    const { data, error, isLoading } = useSWR('listModels', fetchModels)

    // use to update data like useState
    const { data: model, mutate: setModel } = useSWR('selectedModel', {
        fallbackData: 'text-davinci-003'
    })

    return (
        <div className='mt-2'>
            <Select
                className='mt-2'
                options={data?.modelOptions}
                defaultValue={model}
                placeholder={model}
                isClearable
                isLoading={isLoading}
                menuPosition='fixed'
                classNames={{
                    control: (state) => 'text-white bg-[#434654] border-[#434654]'
                }}
                onChange={(e?: { value: string, label: string }) => setModel(e?.value)}
            />
        </div>
    );
}

export default ModelSelection;