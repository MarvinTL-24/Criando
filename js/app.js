// Sistema de personagem
Grimorio.createCharacter(data);
Grimorio.updateCharacter(data);
Grimorio.addXP(amount);
Grimorio.modifyResource('health', 10);

// Sistema de inventário
Grimorio.addItem(item);
Grimorio.removeItem(itemId);
Grimorio.equipItem(itemId, 'mainHand');

// Sistema de habilidades
Grimorio.addSkill(skill);
Grimorio.useSkill(skillId);

// Sistema de mascote
Grimorio.createMascot(data);
Grimorio.feedMascot(foodItem);

// Sistema de dados
Grimorio.rollDice('2d6+3');
Grimorio.rollAttributeCheck('strength', 15);

// Sistema de notificações
Grimorio.showNotification('Mensagem', 'success');
Grimorio.showError('Erro!');
Grimorio.showSuccess('Sucesso!');

// Sistema de eventos
Grimorio.on('character:updated', callback);
Grimorio.off('character:updated', callback);

// Sistema de configurações
Grimorio.saveConfig({ theme: 'dark' });
Grimorio.loadConfig();

// Sistema de save/load
Grimorio.saveAllData();
Grimorio.exportCharacter();
Grimorio.importCharacter(file);

// Utilitários
Grimorio.formatNumber(1234.56, 2);
Grimorio.formatDate(new Date(), 'long');
Grimorio.generateId();