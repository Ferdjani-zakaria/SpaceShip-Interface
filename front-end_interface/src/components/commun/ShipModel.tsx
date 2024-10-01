import { useState } from 'react';
import {Box, Button, Checkbox, Sheet, Modal, ModalDialog, Typography, Input, FormControl, FormLabel } from '@mui/joy';
import MoreVert from '@mui/icons-material/MoreVert';

interface ShipModelProps {
  title?: string;
}

const ShipModel = ({ title = "Ship Model" }: ShipModelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chartChecked, setChartChecked] = useState(false);
  const [warpChecked, setWarpChecked] = useState(false);
  const [dockedOrbitMode, setDockedOrbitMode] = useState<'docked' | 'orbit'>('docked');
  const [textInputValue, setTextInputValue] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleValidate = () => {
    // Add your validation logic here
    console.log('Chart checked:', chartChecked);
    console.log('Warp checked:', warpChecked);
    console.log('Docked/Orbit mode:', dockedOrbitMode);
    console.log('Text input value:', textInputValue);
  };

  const handleToggleMode = () => {
    setDockedOrbitMode(dockedOrbitMode === 'docked' ? 'orbit' : 'docked');
  };

  return (
    <>
      <Box onClick={handleOpenModal} style={{cursor: "pointer"}}><MoreVert /></Box>
      <Modal open={isOpen} aria-labelledby="ship-model-title" onClose={handleCloseModal}>
        <ModalDialog variant="outlined">
          <Typography id="ship-model-title" level="h3">{title}</Typography>
          <FormControl sx={{ My: 2 }}>
            <FormLabel>Text Input</FormLabel>
            <Input value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)} />
          </FormControl>
          <Checkbox
            checked={chartChecked}
            onChange={() => setChartChecked(!chartChecked)}
            label="Chart"
          />
          <Checkbox
            checked={warpChecked}
            onChange={() => setWarpChecked(!warpChecked)}
            label="Warp"
          />
          <Checkbox
            checked={dockedOrbitMode === 'orbit'}
            onChange={handleToggleMode}
            label="Nav"
          />
          <Button onClick={handleToggleMode}>
            {dockedOrbitMode === 'docked' ? 'Switch to Orbit' : 'Switch to Docked'}
          </Button>
          <Sheet variant="outlined" sx={{ p: 2 }}>
            <Button color="primary" variant="plain" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button color="primary" variant="solid" onClick={handleValidate}>
              Validate
            </Button>
          </Sheet>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ShipModel;
