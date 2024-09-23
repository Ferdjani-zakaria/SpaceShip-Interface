import React, { useState, useCallback } from "react";
import { Chip, ChipDelete, FormControl, Select, Option, Box } from "@mui/joy";

interface TagInputProps {
    suggestions: string[];
    trait: string[];
    handleChangeTrait: (updatedTraits: string[]) => void;
    isDisabled?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
    suggestions,
    trait,
    handleChangeTrait,
    isDisabled = true,
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleAddTag = useCallback(
        (tag: string) => {
            const trimmedTag = tag.trim();
            if (trimmedTag && !trait.includes(trimmedTag)) {
                handleChangeTrait([...trait, trimmedTag]); // Add tag to the array
                setSelectedOption(null); // Reset the selected value
            }
        },
        [trait, handleChangeTrait]
    );

    const handleDeleteTag = useCallback(
        (tag: string) => {
            handleChangeTrait(trait.filter((t) => t !== tag)); // Remove tag from the array
        },
        [trait, handleChangeTrait]
    );

    const handleSelectChange = (
        event: React.ChangeEvent<{ value: unknown }>,
        value: string | null
    ) => {
        if (value) {
            handleAddTag(value);
        }
    };

    return (
        <Box display="flex" gap={1} alignItems="flex-end">
            <FormControl size="sm">
                <Select
                    size="sm"
                    onChange={(event, value) => handleSelectChange(event, value)}
                    value={selectedOption || ""}
                    disabled={isDisabled}
                >
                    <Option value="">Select a trait</Option>
                    {suggestions.map((suggestion) => (
                        <Option key={suggestion} value={suggestion}>
                            {suggestion}
                        </Option>
                    ))}
                </Select>
            </FormControl>

            <Box display="flex" gap={1} flexWrap="wrap">
                {trait.map((tag) => (
                    <Chip
                        key={tag}
                        endDecorator={<ChipDelete onDelete={() => handleDeleteTag(tag)} />}
                        variant="soft"
                        color="neutral"
                        component="div"
                    >
                        {tag}
                    </Chip>
                ))}
            </Box>
        </Box>
    );
};

export default TagInput;
